const { test, expect } = require('@playwright/test');



test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator('#login');
    const cardTitle = page.locator(".card-body b");

    await getUrl(page, "https://rahulshettyacademy.com/client/");
    console.log(await getTitle(page));

    await userName.fill("creativestrikers@gmail.com");
    await password.fill("Abcd@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');

    //console.log(await cardTitle.nth(0).textContent());
    console.log(await cardTitle.allTextContents());

});


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
