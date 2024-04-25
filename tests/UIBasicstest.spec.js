const { test, expect } = require('@playwright/test');

test.only("Browser Context Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await getTitle(page));
    await page.locator('#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    let not_Found_Locator =  "[style*='block']";
    console.log(await page.locator(not_Found_Locator).textContent());
    await expect(page.locator(not_Found_Locator)).toContainText('Incorrect');
    
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