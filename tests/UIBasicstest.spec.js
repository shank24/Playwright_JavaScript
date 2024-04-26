const { test, expect } = require('@playwright/test');

test("Browser Context Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    await getUrl(page, "https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await getTitle(page));

    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();

    let not_Found_Locator = "[style*='block']";
    console.log(await page.locator(not_Found_Locator).textContent());
    await expect(page.locator(not_Found_Locator)).toContainText('Incorrect');

    //await userName.fill("");
    await userName.clear();

    await userName.fill("rahulshettyacademy")
    await signIn.click();

    console.log(await cardTitle.nth(0).textContent());
    console.log(await cardTitle.allTextContents());

});



test.only("UI Controls Test", async ({ page }) => {


    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const dropDown = page.locator("select.form-control");
    const radioBtn = page.locator('span.radiotextsty', { hasText: ' User' });
    const okayBtn = page.locator('#okayBtn');
    const checkBox = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']");

    await getUrl(page, "https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await getTitle(page));
    await userName.fill("rahulshetty");
    await password.fill("learning");

    //Drop Down
    await dropDown.selectOption("consult");
    //await page.locator('x-details', { hasText: 'Details' }).click();

    //Radio Button
    await radioBtn.click();
    await okayBtn.click();
    expect(radioBtn).toBeChecked();
    await isChecked(radioBtn);
    await isVisible(radioBtn);

    //Check-Box
    await checkBox.click();
    await isChecked(checkBox);
    await isVisible(checkBox);
    await checkBox.uncheck();
    expect(await isChecked(radioBtn)).toBeFalsy();
    //await page.pause();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');


});

test("Page Test", async ({ page }) => {

    await page.goto("https://google.com")
    const getTitleToMatch = await getTitle(page);
    console.log(await getTitle(page));
    await expect(page).toHaveTitle(getTitleToMatch)
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
