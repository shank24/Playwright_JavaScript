const { test, expect } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Sign In Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator('#login');
    const email = "creativestrikers@gmail.com";

    await getUrl(page, "https://rahulshettyacademy.com/client/");
    console.log(await getTitle(page));

    await userName.fill(email);
    await password.fill("Abcd@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');

    //Getting Storage of all the Session
    await context.storageState({ path: 'state.json' });

    //Injecting state.json into a new browser
    webContext = await browser.newContext({ storageState: 'state.json' });

});

test("@API Assignment Test 1", async () => {

    
    const page = await webContext.newPage();
    await getUrl(page, "https://rahulshettyacademy.com/client/");

    const cardTitle = page.locator(".card-body b");
    console.log(await cardTitle.nth(0).textContent());
    const titles = console.log(await cardTitle.allTextContents());
    console.log(titles);

});


test("@API Assignment Test", async () => {

    //Sign In Locators
    const email = "creativestrikers@gmail.com";

    const page = await webContext.newPage();
    await getUrl(page, "https://rahulshettyacademy.com/client/");

    //Cart Locators
    const products = page.locator(".card-body")
    const cardTitle = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';
    const cartLocator = page.locator("[routerlink*='cart']");
    const checkOutBtn = page.locator("text=Checkout");
    const country = page.locator("[placeholder*='Country']");
    const placeOrderBtn = page.locator('.action__submit');
    const orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');

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
