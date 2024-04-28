const { test, expect } = require('@playwright/test');



test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Sign In Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator('#login');
    const email = "creativestrikers@gmail.com";

    //Cart Locators
    const products = page.locator(".card-body")
    const cardTitle = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';
    const cartLocator = page.locator("[routerlink*='cart']");
    const checkOutBtn = page.locator("text=Checkout");
    const country = page.locator("[placeholder*='Country']");
    const placeOrderBtn = page.locator('.action__submit');
    const orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');

    await getUrl(page, "https://rahulshettyacademy.com/client/");
    console.log(await getTitle(page));

    await userName.fill(email);
    await password.fill("Abcd@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');

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
    //await page.pause();


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
