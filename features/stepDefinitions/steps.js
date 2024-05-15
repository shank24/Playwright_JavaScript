const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

let orderID;
Given('When I login to the Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const browser = await playwright.chromium.launch({
        headless:false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    //Page Object Manager Object Instantiation
    this.POManagerObj = new POManager(page);

    //Login Page Object
    const loginPageObj = this.POManagerObj.getLoginPage();
    await loginPageObj.goTo();
    await loginPageObj.validLogin(username, password);
    await loginPageObj.getTitleOfPage(page);

});

When('I add product {string}', async function (productName) {
    //Dashboard Page Object
    const dashPageObj = this.POManagerObj.getDashboardPage();
    await dashPageObj.searchProduct(productName);
    await dashPageObj.navigateToCart();
});

Then('I verify {string} is displayed succesfully for {string}', async function (productName, countryName) {
    const checkoutPageObj = this.POManagerObj.getCheckoutPage();
    await checkoutPageObj.clickUntilCheckOutBtn(productName);
    await checkoutPageObj.selectCountry(countryName);
});

When('Enter valid details {string} and placed the order', async function (email) {
    //Order Page Object
    const orderPageObj = this.POManagerObj.getOrderPage();
    await orderPageObj.verifyEmail(email);
    await orderPageObj.verifyOrderConfirmation();
    orderID = await orderPageObj.getOrderId();
    await orderPageObj.clickOnOrders();
});

Then('I verify the order is present in the order history for {string}', async function (email) {
    //Thank You Page Object
    const thankYouPageObj = this.POManagerObj.getThankyouPage();
    await thankYouPageObj.verifyOrderId(orderID);
    await thankYouPageObj.verifyOrderAndEmail(orderID, email);
});

