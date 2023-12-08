// This workflow makes sure that people can sign up for experiences.
describe("Experience sign up workflow", () => {
  it("Signs up for an experience successfully", () => {
    cy.viewport('iphone-se2');
    cy.signIn();
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="landing-action-button"]').click();
    cy.url().should('eq', 'http://localhost:3000/home');
    cy.get('[data-cy="experience-card"]').click();
    cy.contains("Test Experience");
    cy.contains("You'll learn how to test different experiences with our experience!");
    cy.contains("Provo, UT");
    cy.contains("Hosted by Learned Local");
    cy.contains("December 20");
    cy.contains("8:30 PM");
    cy.contains("See Details").click();
    cy.url().should('eq', 'http://localhost:3000/experience/view/1');
    cy.contains("Test Experience");
    cy.contains("You'll learn how to test different experiences with our experience!");
    cy.contains("Free");
    cy.contains("Fri, Dec 20");
    cy.contains("08:30 PM - 10:30 PM");
    cy.contains("Provo");
    cy.contains("Ages 0+");
    cy.contains("Items will be prepared");
    cy.contains("You'll need to prepare some of your own items");
    cy.contains("Items will be included");
    cy.contains("You'll learn how to include more items");
    cy.contains("Prepare for some activity");
    cy.contains("Some activity will be required");
    cy.contains("Other stuff");
    cy.contains("You'll be required to sell your soul to the devil :)");
    cy.contains("Hey there! This is Learned Local. We're a test account with all sorts of experience in testing. Want to get tested? Please contact us for more information!");
    cy.contains("@learnedlocal.app");
    cy.contains("Sign up").click();
    cy.url().should('eq', 'http://localhost:3000/checkout?experienceId=1&availabilityId=1');
    cy.get('[data-cy="checkout-first-name"]').type("Test");
    cy.get('[data-cy="checkout-last-name"]').type("McTestington");
    cy.get('[data-cy="checkout-party-size"]').clear().type("1");
    cy.get('[data-cy="checkout-email"]').type("test.mctestington@example.com");
    cy.get('[data-cy="checkout-phone"]').type("2085857221");
    cy.get('[data-cy="checkout-text-reminder"]').uncheck();
    cy.get('[data-cy="checkout-sign-up"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

export {};