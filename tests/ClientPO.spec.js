const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage');
const { dashBoardPage } = require('../pageObjects/dashBoardPage');
const { checkoutPage } = require('../pageObjects/checkoutPage');
const { orderPage } = require('../pageObjects/orderPage');


test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Sign In Values
    const email = "creativestrikers@gmail.com";
    const password = "Abcd@1234";

    //Cart Variable
    const productName = 'ZARA COAT 3';

    //CheckOut Variable
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

    //Thank You Page
    const rows = page.locator("tbody tr");
    console.log(rows.count());


    for (let index = 0; index < await rows.count(); index++) {
        const orderNumber = await rows.nth(index).locator("th").textContent();
        if (orderID.includes(orderNumber)) {
            await rows.nth(index).locator("button").first().click();
            break;
        }
    }

    const orderIdDetail = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetail)).toBeTruthy();

    const emailAtOrderPage = page.locator("div p:has-text(' creativestrikers@gmail.com ')");
    expect(email.includes(emailAtOrderPage));


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
