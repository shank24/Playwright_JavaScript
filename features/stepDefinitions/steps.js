const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let orderID;
Given('When I login to the Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    //Login Page Object
    const loginPageObj = this.POManagerObj.getLoginPage();
    await loginPageObj.goTo();
    await loginPageObj.validLogin(username, password);
    await loginPageObj.getTitleOfPage(this.page);

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

Given('When I login to the Ecommerce2 application with {string} and {string}', async function (username, password) {

    const userName1 = this.page.locator('#username');
    const password1 = this.page.locator("[type='password']");
    const signIn = this.page.locator('#signInBtn');

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    await userName1.fill(username);
    await password1.fill(password);
    await signIn.click();
});

Then('Verify Error message is diplayed', async function () {
    let not_Found_Locator = "[style*='block']";
    console.log(await this.page.locator(not_Found_Locator).textContent());
    await expect(this.page.locator(not_Found_Locator)).toContainText('Incorrect');
});

