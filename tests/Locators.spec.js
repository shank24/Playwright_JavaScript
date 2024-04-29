const { test, expect } = require('@playwright/test');

test("Assignment Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    clickByLabel(page,"Check me out if you Love IceCreams!");
    clickByLabel(page,"Employed");

});
async function clickByLabel(page, locatorText) {
    await page.getByLabel(locatorText).click();
}

