describe('Login Tests', () => {
  it("Logs in successfully using the UI", () => {
    cy.viewport('iphone-se2');
    cy.signOut();
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="hamburger-menu"]').click();
    cy.get('[data-cy="mobile-login-button"]').click();
    cy.url().should('include', 'http://localhost:3000/account/signin');
    cy.get('[data-cy="emailField"]').type(Cypress.env("test_email"));
    cy.get('[data-cy="passwordField"]').type(Cypress.env("test_password"));
    cy.get('[data-cy="signInWithEmailButton"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

export {};