const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');


test.only("Assignment Test", async ({ page }) => {

    const POManagerObj = new POManager(page);

    //Assertion Values
    const email = "creativestrikers@gmail.com";
    const password = "Abcd@1234";
    const productName = 'ZARA COAT 3';
    const countryName = "Can";

    //Login Page Object
    const loginPageObj = POManagerObj.getLoginPage();
    await loginPageObj.goTo();
    await loginPageObj.validLogin(email, password);
    await loginPageObj.getTitleOfPage(page);

    //Dashboard Page Object
    const dashPageObj = POManagerObj.getDashboardPage();
    await dashPageObj.searchProduct(productName);
    await dashPageObj.navigateToCart();

    //Checkout Page Object
    const checkoutPageObj = POManagerObj.getCheckoutPage();
    await checkoutPageObj.clickUntilCheckOutBtn(productName);
    await checkoutPageObj.selectCountry(countryName);

    //Order Page Object
    const orderPageObj = POManagerObj.getOrderPage();
    await orderPageObj.verifyEmail(email);
    await orderPageObj.verifyOrderConfirmation();
    const orderID = await orderPageObj.getOrderId();
    await orderPageObj.clickOnOrders();

    //Thank You Page Object
    const thankYouPageObj = POManagerObj.getThankyouPage();
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
