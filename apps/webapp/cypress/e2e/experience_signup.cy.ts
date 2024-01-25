// This workflow makes sure that people can sign up for experiences.
describe("Experience sign up workflow", () => {
  it("Signs up for an experience successfully", () => {

    // Init stuff
    cy.viewport('iphone-se2');
    cy.signIn();

    // Visit the home page, go to the experiences page
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="landing-action-button"]').click();
    cy.url().should('eq', 'http://localhost:3000/home');

    // Click on the experience card and check the details
    cy.get('[data-cy="experience-card"]').click();
    cy.contains("Test Experience");
    cy.contains("You'll learn how to test different experiences with our experience!");
    cy.contains("Provo, UT");
    cy.contains("Hosted by Learned Local");
    cy.contains("December 20");
    cy.contains("8:30 PM");

    // Click on "See Details" and check all the experience details
    cy.contains("See Details").click();
    cy.url().should('eq', 'http://localhost:3000/experience/view/1');
    cy.contains("Test Experience");
    cy.contains("You'll learn how to test different experiences with our experience!");
    cy.contains("Event details");
    cy.contains("Free");
    cy.contains("Fri, Dec 20");
    cy.contains("8:30 PM - 10:30 PM");
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

    // Check that you can change your registration date and guest count
    cy.wait(3000);
    cy.get('[data-cy="date-sign-up"]').click();
    cy.contains("15 spots left");
    cy.get('[data-cy="date-option:Fri, Dec 27"]').click();
    cy.get('[data-cy="plusGuestButton"]').click().click();
    cy.get('[data-cy="guestCountDisplay"]').contains("3"); 

    // Checkout the experience
    cy.contains("Sign up").click();
    cy.url().should('eq', 'http://localhost:3000/checkout?experienceId=1&availabilityId=2&partySize=3');
    cy.get('[data-cy="checkout-first-name"]').type("Test");
    cy.get('[data-cy="checkout-last-name"]').type("McTestington");
    cy.get('[data-cy="checkout-party-size"]').should('have.value', '3');
    cy.get('[data-cy="checkout-email"]').type("test.mctestington@example.com");
    cy.get('[data-cy="checkout-phone"]').type("2085857221");
    cy.get('[data-cy="checkout-text-reminder"]').uncheck();
    cy.get('[data-cy="checkout-sign-up"]').click();
    cy.url().should('eq', 'http://localhost:3000/');

    // Go view the experience in the "my experiences" page and then its detail page
    cy.get('[data-cy="hamburger-menu"]').click();
    cy.get('[data-cy="mobile-my-experiences-link"]').click();
    cy.url().should('eq', 'http://localhost:3000/myexperiences');
    cy.contains("Test Experience");
    cy.get('[data-cy="experience-card"]').click();
    cy.contains("See Details").click();
    cy.url().should('eq', 'http://localhost:3000/experience/view/1');
    cy.contains("Your Reservation");
    cy.contains("Fri, Dec 27");
    cy.contains("8:30 PM - 10:30 PM");
    cy.contains("3 guests");
    cy.contains("Free");

    // Change the reservation, make sure guest counts are correct
    cy.get('[data-cy="change-reservation-button"]').click();
    cy.get('[data-cy="change-reservation-button-primary"]').click();
    cy.get('[data-cy="date-sign-up"]').click();
    cy.contains("15 spots left");
    cy.contains("12 spots left");
    cy.contains("Fri, Dec 20").click();
    cy.get('[data-cy="change-reservation-button-primary"]').click();
    cy.wait(1000);
    cy.get('[data-cy="change-reservation-button-primary"]').click();

    // Go view the new reservation
    cy.url().should('eq', 'http://localhost:3000/myexperiences');
    cy.contains("Test Experience");
    cy.get('[data-cy="experience-card"]').click();
    cy.contains("See Details").click();
    cy.url().should('eq', 'http://localhost:3000/experience/view/1');
    cy.contains("Your Reservation");
    cy.contains("Fri, Dec 20");
    cy.contains("8:30 PM - 10:30 PM");
    cy.contains("3 guests");
    cy.contains("Free");

    // Cancel the reservation and check to make sure it was canceled
    cy.get('[data-cy="change-reservation-button"]').click();
    cy.get('[data-cy="change-reservation-button-secondary"]').click();
    cy.get('[data-cy="change-reservation-button-primary"]').click();
    cy.wait(1000);
    cy.get('[data-cy="change-reservation-button-primary"]').click();
    cy.url().should('eq', 'http://localhost:3000/home');
    cy.get('[data-cy="experience-card"]').click();
    cy.contains("See Details").click();
    cy.url().should('eq', 'http://localhost:3000/experience/view/1');
    cy.reload();
    cy.contains("Event details");
  });
});

export {};