const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage');
const { dashBoardPage } = require('../pageObjects/dashBoardPage');
const { checkoutPage } = require('../pageObjects/checkoutPage');
const { orderPage } = require('../pageObjects/orderPage');
const { thankYouPage } = require('../pageObjects/thankYouPage');

test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Assertion Values
    const email = "creativestrikers@gmail.com";
    const password = "Abcd@1234";
    const productName = 'ZARA COAT 3';
    const countryName = "Can";

    //Login Page Object
    const loginPageObj = new loginPage(page);
    await loginPageObj.goTo();
    await loginPageObj.validLogin(email, password);
    await loginPageObj.getTitleOfPage(page);

    //Dashboard Page Object
    const dashPageObj = new dashBoardPage(page);
    await dashPageObj.searchProduct(productName);
    await dashPageObj.navigateToCart();

    //Checkout Page Object
    const checkoutPageObj = new checkoutPage(page);
    await checkoutPageObj.clickUntilCheckOutBtn();
    await checkoutPageObj.selectCountry(countryName);

    //Order Page Object
    const orderPageObj = new orderPage(page);
    await orderPageObj.verifyEmail(email);
    await orderPageObj.verifyOrderConfirmation();
    const orderID = await orderPageObj.getOrderId();
    await orderPageObj.clickOnOrders();

    //Thank You Page Object
    const thankYouPageObj = new thankYouPage(page);
    await thankYouPageObj.verifyOrderId(orderID);
    await thankYouPageObj.verifyOrderAndEmail(orderID, email);

});

// Methods
async function isVisible(radioBtn) {
    console.log(await radioBtn.isVisible());
}

async function isChecked(radioBtn) {
    console.log(await radioBtn.isChecked());
}

async function getUrl(page, url) {
    await page.goto(url);
}

async function getTitle(page) {
    return await page.title();
}
