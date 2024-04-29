const { test, expect } = require('@playwright/test');

test("Locator Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    clickByLabel(page,"Check me out if you Love IceCreams!");
    clickByLabel(page,"Employed");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Hakuna Matata");

});
async function clickByLabel(page, locatorText) {
    await page.getByLabel(locatorText).click();
}

