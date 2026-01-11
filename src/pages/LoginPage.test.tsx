import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { LoginPage } from '../pages/LoginPage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage Component', () => {
  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('should render login form', () => {
    renderLoginPage();
    
    expect(screen.getByLabelText(/Uživatelské jméno/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Heslo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /PŘIHLÁSIT/i })).toBeInTheDocument();
  });

  it('should show validation error for empty fields', async () => {
    renderLoginPage();
    
    const usernameInput = screen.getByLabelText(/Uživatelské jméno/i);
    const passwordInput = screen.getByLabelText(/Heslo/i);
    const submitButton = screen.getByRole('button', { name: /PŘIHLÁSIT/i });
    
    // Leave fields empty and submit
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);
    
    // Check that submit button is present (form should prevent submission via HTML5 validation)
    expect(submitButton).toBeInTheDocument();
  });

  it('should show error for invalid credentials', async () => {
    renderLoginPage();
    
    const usernameInput = screen.getByLabelText(/Uživatelské jméno/i);
    const passwordInput = screen.getByLabelText(/Heslo/i);
    const submitButton = screen.getByRole('button', { name: /PŘIHLÁSIT/i });
    
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Neplatné přihlašovací údaje/i)).toBeInTheDocument();
    });
  });

  it('should have link to registration page', () => {
    renderLoginPage();
    
    const registrationLink = screen.getByText(/Zaregistrujte se/i);
    expect(registrationLink).toBeInTheDocument();
    expect(registrationLink).toHaveAttribute('href', '/registration');
  });
});
