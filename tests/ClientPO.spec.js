const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');

//Converting JSON Object -> String Object -> JavaScript Object
const testData = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));


test.only("Assignment Test", async ({ page }) => {

    //Page Object Manager Object Instantiation
    const POManagerObj = new POManager(page);

    //Login Page Object
    const loginPageObj = POManagerObj.getLoginPage();
    await loginPageObj.goTo();
    await loginPageObj.validLogin(testData.email, testData.password);
    await loginPageObj.getTitleOfPage(page);

    //Dashboard Page Object
    const dashPageObj = POManagerObj.getDashboardPage();
    await dashPageObj.searchProduct(testData.productName);
    await dashPageObj.navigateToCart();

    //Checkout Page Object
    const checkoutPageObj = POManagerObj.getCheckoutPage();
    await checkoutPageObj.clickUntilCheckOutBtn(testData.productName);
    await checkoutPageObj.selectCountry(testData.countryName);

    //Order Page Object
    const orderPageObj = POManagerObj.getOrderPage();
    await orderPageObj.verifyEmail(testData.email);
    await orderPageObj.verifyOrderConfirmation();
    const orderID = await orderPageObj.getOrderId();
    await orderPageObj.clickOnOrders();

    //Thank You Page Object
    const thankYouPageObj = POManagerObj.getThankyouPage();
    await thankYouPageObj.verifyOrderId(orderID);
    await thankYouPageObj.verifyOrderAndEmail(orderID, testData.email);

});
