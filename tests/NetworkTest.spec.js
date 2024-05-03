const { test, expect, request } = require('@playwright/test');

test('Security Test Intercept', async ({ page }) => {

    //Sign In Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator('#login');
    const email = "creativestrikers@gmail.com";

    //Cart Locators
    const cardTitle = page.locator(".card-body b");
    const blinkText = page.locator(".blink_me")
  
    await page.goto("https://rahulshettyacademy.com/client/");

    await userName.fill(email);
    await password.fill("Abcd@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    await cardTitle.first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    //Request Interceptor
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue ({ url :'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=663412e5a86f8f74dcd411f8'}),
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await expect(blinkText).toHaveText("You are not authorize to view this order");
    
});