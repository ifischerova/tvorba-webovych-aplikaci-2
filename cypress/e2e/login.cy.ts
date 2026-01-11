describe('User Login Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.contains('h1', 'Běhej dál - dojeď rychleji!')
    cy.get('input[id="username"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain', 'PŘIHLÁSIT')
  })

  it('should validate empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Vyplňte prosím všechna pole').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[id="username"]').type('wronguser')
    cy.get('input[id="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('Neplatné přihlašovací údaje').should('be.visible')
  })

  it('should successfully login with correct credentials (happy path)', () => {
    // Use existing user from mock data
    cy.get('input[id="username"]').type('admin')
    cy.get('input[id="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Should redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    // Should show user info in header
    cy.contains('Profil (admin)').should('be.visible')
  })

  it('should allow navigation to registration page', () => {
    cy.contains('Zaregistrujte se').click()
    cy.url().should('include', '/registration')
  })

  it('should persist login after page reload', () => {
    // Login first
    cy.get('input[id="username"]').type('admin')
    cy.get('input[id="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Reload page
    cy.reload()
    
    // Should still be logged in
    cy.contains('Profil (admin)').should('be.visible')
  })

  it('should logout successfully', () => {
    // Login first
    cy.get('input[id="username"]').type('admin')
    cy.get('input[id="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Logout
    cy.contains('Odhlásit se').click()
    
    // Should show login link in menu
    cy.visit('/login')
    cy.get('input[id="username"]').should('be.visible')
  })
})
