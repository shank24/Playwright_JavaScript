const { test } = require('@playwright/test');
const { customTestFixture } = require('../utils/test-base');
const { POManager } = require('../pageObjects/POManager');

//Converting JSON Object -> String Object -> JavaScript Object
const testData = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));


for (const data of testData) {

    test(`@WEB Buy Order Test For ${data.productName}`, async ({ page }) => {

        //Page Object Manager Object Instantiation
        const POManagerObj = new POManager(page);

        //Login Page Object
        const loginPageObj = POManagerObj.getLoginPage();
        await loginPageObj.goTo();
        await loginPageObj.validLogin(data.email, data.password);
        await loginPageObj.getTitleOfPage(page);

        //Dashboard Page Object
        const dashPageObj = POManagerObj.getDashboardPage();
        await dashPageObj.searchProduct(data.productName);
        await dashPageObj.navigateToCart();

        //Checkout Page Object
        const checkoutPageObj = POManagerObj.getCheckoutPage();
        await checkoutPageObj.clickUntilCheckOutBtn(data.productName);
        await checkoutPageObj.selectCountry(data.countryName);

        //Order Page Object
        const orderPageObj = POManagerObj.getOrderPage();
        await orderPageObj.verifyEmail(data.email);
        await orderPageObj.verifyOrderConfirmation();
        const orderID = await orderPageObj.getOrderId();
        await orderPageObj.clickOnOrders();

        //Thank You Page Object
        const thankYouPageObj = POManagerObj.getThankyouPage();
        await thankYouPageObj.verifyOrderId(orderID);
        await thankYouPageObj.verifyOrderAndEmail(orderID, data.email);

    });
}

customTestFixture.only('@WEB Order Test Via Fixture', async ({ page, testDataOrder }) => {

    //Page Object Manager Object Instantiation
    const POManagerObj = new POManager(page);

    //Login Page Object
    const loginPageObj = POManagerObj.getLoginPage();
    await loginPageObj.goTo();
    await loginPageObj.validLogin(testDataOrder.email, testDataOrder.password);
    await loginPageObj.getTitleOfPage(page);

    //Dashboard Page Object
    const dashPageObj = POManagerObj.getDashboardPage();
    await dashPageObj.searchProduct(testDataOrder.productName);
    await dashPageObj.navigateToCart();

    //Checkout Page Object
    const checkoutPageObj = POManagerObj.getCheckoutPage();
    await checkoutPageObj.clickUntilCheckOutBtn(testDataOrder.productName);
    await checkoutPageObj.selectCountry(testDataOrder.countryName);
});

