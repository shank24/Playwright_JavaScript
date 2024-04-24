const { test, expect } = require('@playwright/test');

test("Browser Context Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/")
    console.log(await getTitle(page));

});

test("Page Test", async ({ page }) => {

    await page.goto("https://google.com")
    const getTitleToMatch = await getTitle(page);
    console.log(await getTitle(page));
    await expect(page).toHaveTitle(getTitleToMatch)
    

});

async function getTitle(page) {
    return await page.title();
}
