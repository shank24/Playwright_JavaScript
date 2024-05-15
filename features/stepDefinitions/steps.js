const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { test, expect, playwright } = require('@playwright/test');


Given('When I login to the Ecommerce application with {string} and {string}', async function (string, string2) {

    const browser = await playwright.chromium.launch();

    const context = await browser.newContext();
    const page = await context.newPage();

    //Page Object Manager Object Instantiation
    const POManagerObj = new POManager(page);

    //Login Page Object
    const loginPageObj = POManagerObj.getLoginPage();
    await loginPageObj.goTo();
    await loginPageObj.validLogin(data.email, data.password);
    await loginPageObj.getTitleOfPage(page);

});

When('I add product {string}', async function (string) {
    //Dashboard Page Object
    const dashPageObj = POManagerObj.getDashboardPage();
    await dashPageObj.searchProduct(data.productName);
    await dashPageObj.navigateToCart();
});

Then('I verify {string} is displayed succesfully', async function (string) {
    const checkoutPageObj = POManagerObj.getCheckoutPage();
        await checkoutPageObj.clickUntilCheckOutBtn(data.productName);
        await checkoutPageObj.selectCountry(data.countryName);
});

When('Enter valid details and placed the order', async function () {
    //Order Page Object
    const orderPageObj = POManagerObj.getOrderPage();
    await orderPageObj.verifyEmail(data.email);
    await orderPageObj.verifyOrderConfirmation();
    const orderID = await orderPageObj.getOrderId();
    await orderPageObj.clickOnOrders();
});

Then('I verify the order is present in the order history', async function () {
    //Thank You Page Object
    const thankYouPageObj = POManagerObj.getThankyouPage();
    await thankYouPageObj.verifyOrderId(orderID);
    await thankYouPageObj.verifyOrderAndEmail(orderID, data.email);
});

