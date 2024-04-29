const { test, expect } = require('@playwright/test');

test.only("Pop Validations Test", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();



});
