describe('User Registration Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/registration')
  })

  it('should display registration form', () => {
    cy.contains('h1', 'Běhej dál - dojeď rychleji!')
    cy.get('input[id="username"]').should('be.visible')
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('input[id="confirmPassword"]').should('be.visible')
    cy.get('input[id="terms"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain', 'REGISTROVAT')
  })

  it('should validate empty form submission', () => {
    cy.get('button[type="submit"]').click()
    cy.get('input[id="username"]:invalid').should('exist')
  })

  it('should validate password mismatch', () => {
    cy.get('input[id="username"]').type('testuser')
    cy.get('input[id="email"]').type('test@example.com')
    cy.get('input[id="password"]').type('Password123')
    cy.get('input[id="confirmPassword"]').type('DifferentPassword')
    cy.get('input[id="terms"]').check()
    cy.get('button[type="submit"]').click()
    cy.contains('Hesla se neshodují').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('input[id="username"]').type('testuser')
    cy.get('input[id="email"]').type('invalidemail')
    cy.get('input[id="password"]').type('Password123')
    cy.get('input[id="confirmPassword"]').type('Password123')
    cy.get('input[id="terms"]').check()
    cy.get('button[type="submit"]').click()
    cy.contains('Neplatný formát emailu').should('be.visible')
  })

  it('should require terms acceptance', () => {
    cy.get('input[id="username"]').type('testuser')
    cy.get('input[id="email"]').type('test@example.com')
    cy.get('input[id="password"]').type('Password123')
    cy.get('input[id="confirmPassword"]').type('Password123')
    cy.get('button[type="submit"]').click()
    cy.contains('Musíte přijmout podmínky použití').should('be.visible')
  })

  it('should successfully register a new user (happy path)', () => {
    const timestamp = Date.now()
    const username = `testuser${timestamp}`
    const email = `test${timestamp}@example.com`
    
    cy.get('input[id="username"]').type(username)
    cy.get('input[id="email"]').type(email)
    cy.get('input[id="password"]').type('Password123')
    cy.get('input[id="confirmPassword"]').type('Password123')
    cy.get('input[id="terms"]').check()
    cy.get('button[type="submit"]').click()
    
    // Should redirect to login after successful registration
    cy.url().should('include', '/login')
  })

  it('should show error for duplicate username', () => {
    // First, register a user
    const username = 'admin' // This user already exists in mock data
    
    cy.get('input[id="username"]').type(username)
    cy.get('input[id="email"]').type('newadmin@example.com')
    cy.get('input[id="password"]').type('Password123')
    cy.get('input[id="confirmPassword"]').type('Password123')
    cy.get('input[id="terms"]').check()
    cy.get('button[type="submit"]').click()
    
    cy.contains('Uživatelské jméno již existuje').should('be.visible')
  })
})
