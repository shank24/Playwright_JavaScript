const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "creativestrikers@gmail.com", userPassword: "Abcd@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };

let orderID;
let token;

test.beforeAll(async () => {

    //Login APIs
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

    //Order APIs
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderID = orderResponseJson.orders[0];
});

test.beforeEach(() => {

});

test("Place an Order API Test", async ({ page }) => {

    //Injecting token into Session
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

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
        if (orderID.includes(orderNumber)) {
            await rows.nth(index).locator("button").first().click();
            break;
        }
    }

    const orderIdDetail = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderID.includes(orderIdDetail)).toBeTruthy();

    const emailAtOrderPage = page.locator("div p:has-text(' creativestrikers@gmail.com ')");
    expect(email.includes(emailAtOrderPage));


});