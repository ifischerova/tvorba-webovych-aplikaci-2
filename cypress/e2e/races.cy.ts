describe('Races and Rides Management', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('should display races list', () => {
    cy.visit('/races')
    cy.contains('Zvol termín závodu').should('be.visible')
    cy.get('select').should('be.visible')
  })

  it('should select a race and view details', () => {
    cy.visit('/races')
    cy.get('select').select(1) // Select first race
    cy.contains('Pražský maraton').should('be.visible')
    cy.contains('Dostupné jízdy').should('be.visible')
  })

  it('should require login to create a ride', () => {
    cy.visit('/races')
    cy.get('select').select(1)
    cy.contains('+ Přidat jízdu').should('not.exist')
    cy.contains('přihlásit').should('be.visible')
  })

  it('should create a new ride offer when logged in (happy path)', () => {
    // Login first
    cy.login('admin', 'admin123')
    
    // Navigate to races
    cy.visit('/races')
    
    // Select a race
    cy.get('select').select(1)
    
    // Click add ride button
    cy.contains('+ Přidat jízdu').click()
    
    // Fill in the form
    cy.get('select').first().select('OFFER')
    cy.get('input[type="text"]').first().type('Brno')
    cy.get('input[type="text"]').eq(1).type('Praha')
    cy.get('input[type="text"]').eq(2).type('Škoda Fabia')
    cy.get('select').eq(2).select('2')
    cy.get('textarea').type('Odjezd v 7:00')
    
    // Submit
    cy.get('button[type="submit"]').click()
    
    // Should show success message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('úspěšně vytvořena')
    })
  })

  it('should create a ride request when logged in', () => {
    // Login first
    cy.login('admin', 'admin123')
    
    // Navigate to races
    cy.visit('/races')
    
    // Select a race
    cy.get('select').select(1)
    
    // Click add ride button
    cy.contains('+ Přidat jízdu').click()
    
    // Select request type
    cy.get('select').first().select('REQUEST')
    
    // Fill in form
    cy.get('input[type="text"]').first().type('Ostrava')
    cy.get('select').eq(1).select('1')
    
    // Submit
    cy.get('button[type="submit"]').click()
    
    // Should show success message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('úspěšně vytvořena')
    })
  })

  it('should display existing rides in table', () => {
    cy.visit('/races')
    cy.get('select').select(1)
    
    // Should show table headers
    cy.contains('Typ').should('be.visible')
    cy.contains('Uživatel').should('be.visible')
    cy.contains('Odkud').should('be.visible')
  })

  it('should cancel ride creation form', () => {
    cy.login('admin', 'admin123')
    cy.visit('/races')
    cy.get('select').select(1)
    cy.contains('+ Přidat jízdu').click()
    
    // Form should be visible
    cy.contains('Typ jízdy').should('be.visible')
    
    // Click cancel
    cy.contains('Zrušit').click()
    
    // Form should be hidden
    cy.contains('Typ jízdy').should('not.exist')
  })
})
