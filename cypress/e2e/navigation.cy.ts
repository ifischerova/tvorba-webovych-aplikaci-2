describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to all main pages', () => {
    // Test About page
    cy.contains('O nás').click()
    cy.url().should('include', '/about')
    cy.contains('Vize').should('be.visible')

    // Test Races page
    cy.contains('Závody').click()
    cy.url().should('include', '/races')
    cy.contains('Zvol termín závodu').should('be.visible')

    // Test Organizers page
    cy.contains('Organizátoři').click()
    cy.url().should('include', '/organizers')
    cy.contains('pořadatelům').should('be.visible')

    // Test Registration page
    cy.contains('Registrace').click()
    cy.url().should('include', '/registration')
    cy.contains('REGISTROVAT').should('be.visible')
  })

  it('should have working mobile menu', () => {
    cy.viewport('iphone-x')
    
    // Open mobile menu
    cy.get('button[aria-label="Toggle menu"]').click()
    
    // Check if menu items are visible
    cy.contains('O nás').should('be.visible')
    cy.contains('Závody').should('be.visible')
  })

  it('should display home page content', () => {
    cy.contains('Cesta na závod?').should('be.visible')
    cy.contains('Ekologie').should('be.visible')
    cy.contains('Komunita').should('be.visible')
    cy.contains('Úspora').should('be.visible')
  })
})
