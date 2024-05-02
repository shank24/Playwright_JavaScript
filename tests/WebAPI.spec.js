const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "creativestrikers@gmail.com", userPassword: "Abcd@1234" };
let token;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post
        (
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: loginPayload }
        )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
});

test.beforeEach(() => {

});

test("API Login Test", async ({ page }) => {

    //Injecting token into Session
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());

    

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