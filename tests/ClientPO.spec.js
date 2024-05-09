const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage');
const { dashBoardPage } = require('../pageObjects/dashBoardPage');
const { checkoutPage } = require('../pageObjects/checkoutPage');


test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Sign In Values
    const email = "creativestrikers@gmail.com";
    const password = "Abcd@1234";

    //Cart Locators
    const productName = 'ZARA COAT 3';

    //CheckOut Locator
    const countryName = "Can";

    const country = page.locator("[placeholder*='Country']");
    const placeOrderBtn = page.locator('.action__submit');
    
    
    //Order Locator
    const orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');

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


    expect(page.locator("label[type='text']")).toHaveText(email);
    await placeOrderBtn.click();
    const successMsg = page.locator("h1:has-text(' Thankyou for the order. ')").isVisible();
    expect(successMsg).toBeTruthy();
    const orderID = await orderIdLocator.textContent();
    console.log(orderID);

    //Order Page
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

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
