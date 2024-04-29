const { test, expect } = require('@playwright/test');

test("Locator Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    clickByLabel(page,"Check me out if you Love IceCreams!");
    clickByLabel(page,"Employed");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Hakuna Matata");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: 'Shop'}).click();
    //Locator Chaining
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    
});
async function clickByLabel(page, locatorText) {
    await page.getByLabel(locatorText).click();
}

