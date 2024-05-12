const { test, expect } = require('@playwright/test');

test.describe.configure({mode:'parallel'})
test("@WEB Pop Validations Test", async ({ page }) => {

    /*await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();*/

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Dialog Or Pop Up.
    page.on('dialog',dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    // Hover
    await page.locator('#mousehover').hover();

    // Frames
    const framesPage =  page.frameLocator("#courses-iframe");

    //Locators in Frames
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();

    const subscriberNumber = await framesPage.locator(".text h2 span").textContent();
    console.log(subscriberNumber);

});


test("@WEB Screenshot & Visual Comparison Test", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //Screenshot of specific element
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});

    await page.locator("#hide-textbox").click();
    //Screenshot of whole page
    //await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

});


test.only("Image Comparison Test", async ({ page }) => {


    await page.goto("https://www.google.com/");
    expect (await page.screenshot()).toMatchSnapshot('landing.png');

});