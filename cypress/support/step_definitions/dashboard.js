import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-xpath';

const locators = {
    profileIcon: '.profile-icon',
    inputEmail: '[data-test="username"]',
    inputPassword: '[data-test="password"]',
    submitButton: '[data-test="login-button"]',
    profileMenu: '#react-burger-menu-btn',
    cartBadge: '.shopping_cart_badge',
    logoutButton: '#logout_sidebar_link',
    menuItems: '[class="bm-item-list"]>a'
};

Given('I open the dashboard page with username {string} and password {string}', (username, password) => {
    cy.visit('https://www.saucedemo.com', { failOnStatusCode: false });
    cy.get(locators.inputEmail).type(username);
    cy.get(locators.inputPassword).type(password);
    cy.get(locators.submitButton).click();
});

Then('I should see the title {string}', (title) => {
  cy.title().should('eq', title);
});

Then('I should see the profile menu', () => {
    cy.get(locators.profileMenu).should('be.visible');
});

When('I should see the profile menu and click on it', () => {
    cy.get(locators.profileMenu).click();
});

Then('I should see the menu options:', (dataTable) => {
    cy.get(locators.menuItems).each(($el) => {
        const text = $el.text().trim();
        expect(dataTable.rawTable.flat()).to.include(text);
    });
});

Then('I log out from the application', () => {
    cy.get(locators.logoutButton).click();
});

When('I add the following items to the cart:', (dataTable) => {
    const items = dataTable.rawTable.flat();
    items.forEach(item => {
        cy.xpath(`//div[contains(text(),'${item}')]/ancestor::div[@class="inventory_item"]//button`).click();
    });
});

Then('I should see {string} items in the cart', (itemCount) => {
    cy.get(locators.cartBadge).scrollIntoView().should('have.text', itemCount);
});