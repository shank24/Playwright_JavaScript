const { test, expect } = require('@playwright/test');
const {loginPage} = require('../pageObjects/loginPage');


test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Sign In Values
    const email = "creativestrikers@gmail.com";
    const password ="Abcd@1234";

    //Cart Locators
    const products = page.locator(".card-body")
    const cardTitle = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';
    const cartLocator = page.locator("[routerlink*='cart']");
    const checkOutBtn = page.locator("text=Checkout");
    const country = page.locator("[placeholder*='Country']");
    const placeOrderBtn = page.locator('.action__submit');
    const orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');

    //Login Object
    const loginPageObj = new loginPage(page);
    loginPageObj.goTo();
    loginPageObj.validLogin(email,password);
    await page.waitForLoadState('networkidle');
    console.log(await getTitle(page));


    //console.log(await cardTitle.nth(0).textContent());
    const titles = console.log(await cardTitle.allTextContents());
    console.log(titles);
    const countOfProducts = await products.count();

    for (let i = 0; i < countOfProducts; i++) {
        if (await products.nth(i).locator('b').textContent() == productName) {
            //Add To cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await cartLocator.click();

    //Page Loads
    await page.locator("div li").first().waitFor();

    const isPresent = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isPresent).toBeTruthy();

    await checkOutBtn.click();
    await country.pressSequentially("Can");
    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();

    for (let index = 0; index < optionsCount; index++) {
        const text = await dropDown.locator("button").nth(index).textContent();

        if (text === " Canada") {
            await dropDown.locator("button").nth(index).click();
            break;
        }
    }

    expect (page.locator("label[type='text']")).toHaveText(email);
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
    expect (orderID.includes(orderIdDetail)).toBeTruthy();

    const emailAtOrderPage = page.locator("div p:has-text(' creativestrikers@gmail.com ')");
    expect (email.includes(emailAtOrderPage));


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
