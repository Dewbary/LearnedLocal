describe('Landing Page Tests', () => {

  it("loads the landing page", () => {
    cy.visit('http://localhost:3000/');
  });
  it("links to home page using action button", () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="landing-action-button"]').click();
    cy.url().should('eq', 'http://localhost:3000/home');
  });

  context('desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });
    it("clicks on the experience listings page", () => {
      cy.visit('http://localhost:3000/');
      cy.get('[data-cy="desktop-home-link"]').click();
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-se2');
    });
    it("clicks on the experience listings page", () => {
      cy.visit('http://localhost:3000/');
      cy.get('[data-cy="hamburger-menu"]').click();
      cy.get('[data-cy="mobile-home-link"]').click();
    });
  });

});

export {};