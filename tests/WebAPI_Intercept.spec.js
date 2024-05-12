const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { userEmail: "creativestrikers@gmail.com", userPassword: "Abcd@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };
const fakePayloadOrders = {data:[], message: "No Orders"}

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiObject = new APIUtils(apiContext, loginPayload);
    response = await apiObject.createOrder(orderPayload);

});

test("@API Network Intercept Test", async ({ page }) => {


    //Injecting token into Session
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*",
    async route =>
    {   
        //API Response
        const response = await page.request.fetch(route.request());
        
        //Fake Response Body
        let body = JSON.stringify(fakePayloadOrders);

        //Render Back To Browser By Faking It
        route.fulfill(
            {
                response,
                body,
            }
        )
        //Intercepting Response - API Response -> |{Playwright Faking Response}|  Browser -> Render Data on Front End 

    });
    
    //console.log(await page.title());

    //Order Page
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    
});