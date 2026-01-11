// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      clearLocalStorage(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login')
  cy.get('input[id="username"]').type(username)
  cy.get('input[id="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('clearLocalStorage', () => {
  cy.clearLocalStorage()
})

export {}
