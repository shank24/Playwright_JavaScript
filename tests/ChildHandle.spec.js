const { test, expect } = require('@playwright/test');

test.only("Child Window Handle Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    
    await getUrl(page, "https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    

    //Wait For event to happen - a new page
    const [newPage]= await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]) //New Page is opened

    const text = await newPage.locator(".red").textContent();
    console.log(text);
});


// Methods

async function isVisible(radioBtn) {
    console.log(await radioBtn.isVisible());
}

async function isChecked(radioBtn) {
    console.log(await radioBtn.isChecked());
}

async function getUrl(page, url) {
    await page.goto(url);
}

async function getTitle(page) {
    return await page.title();
}
