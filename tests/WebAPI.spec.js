const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { userEmail: "creativestrikers@gmail.com", userPassword: "Abcd@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiObject = new APIUtils(apiContext, loginPayload);
    response = await apiObject.createOrder(orderPayload);

});

test("@API Place an Order API Test", async ({ page }) => {


    //Injecting token into Session
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());

    //Sign In Locators
    const email = "creativestrikers@gmail.com";

    //Order Page
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    console.log(rows.count());

    for (let index = 0; index < await rows.count(); index++) {
        const orderNumber = await rows.nth(index).locator("th").textContent();
        if (response.orderID.includes(orderNumber)) {
            await rows.nth(index).locator("button").first().click();
            break;
        }
    }

    const orderIdDetail = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderID.includes(orderIdDetail)).toBeTruthy();

    const emailAtOrderPage = page.locator("div p:has-text(' creativestrikers@gmail.com ')");
    expect(email.includes(emailAtOrderPage));
});