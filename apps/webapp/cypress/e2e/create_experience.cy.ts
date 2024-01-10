// This test ensures that a new user to the website can create an experience.
describe("Profile and experience creation workflow", () => {
  it("Creates a profile and experience successfully", () => {
    cy.viewport("iphone-se2");
    cy.signIn();
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy="hamburger-menu"]').click();
    cy.get('[data-cy="mobile-create-link"]').click();
    cy.url().should('include', "http://localhost:3000/experience/create/");
    cy.contains("Set Up My Profile").click();
    cy.url().should('eq', "http://localhost:3000/account/hostonboard");
    cy.get('[data-cy="personalTitleField"]').type("An expert at experting");
    cy.get('[data-cy="bioField"]').type("I'm pretty much an expert at being an expert. So I decided I would teach others, using my expertise, on how to be experts themselves!");
    cy.get('[data-cy="instaField"]').type("@dj.cmax");
    cy.get('[data-cy="facebookField"]').type("example.com");
    cy.get('[data-cy="phoneField"]').type("2085857221");
    cy.get('[data-cy="hostonboardNextButton"]').click();
    cy.get('[data-cy="venmoField"]').type("@test-testing");
    cy.get('[data-cy="zelleField"]').type("zell@zell.com");
    cy.get('[data-cy="hostonboardNextButton"]').click();
    cy.get('[data-cy="createExpNowCheckbox"]').click();
    cy.get('[data-cy="hostonboardNextButton"]').click();
    cy.url().should('include', "http://localhost:3000/experience/create/");
    // To be continued, once the new create experience flow is up and running
  })
})

export {};