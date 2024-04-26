const { test, expect } = require('@playwright/test');

test("Browser Context Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    await getUrl(page,"https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await getTitle(page));

    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();

    let not_Found_Locator =  "[style*='block']"; 
    console.log(await page.locator(not_Found_Locator).textContent());
    await expect(page.locator(not_Found_Locator)).toContainText('Incorrect');
    
    //await userName.fill("");
    await userName.clear();
    
    await userName.fill("rahulshettyacademy")
    await signIn.click();

    console.log(await cardTitle.nth(0).textContent());
    console.log(await cardTitle.allTextContents());
    
});

test("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#userEmail"); 
    const password = page.locator("#userPassword");
    const signIn = page.locator('#login');
    const cardTitle = page.locator(".card-body b");

    await getUrl(page,"https://rahulshettyacademy.com/client/");
    console.log(await getTitle(page));

    await userName.fill("creativestrikers@gmail.com");
    await password.fill("Abcd@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');

    //console.log(await cardTitle.nth(0).textContent());
    console.log(await cardTitle.allTextContents());
    
});


test.only("UI Controls Test", async ({ page }) => {


    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const dropDown = page.locator("select.form-control");
    const radioBtn = page.locator('span.radiotextsty' , { hasText: ' User' });

    await getUrl(page,"https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await getTitle(page));
    
    
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await dropDown.selectOption("consult");
    //await page.locator('x-details', { hasText: 'Details' }).click();
    await radioBtn.click();
    await page.pause();


});

test("Page Test", async ({ page }) => {

    await page.goto("https://google.com")
    const getTitleToMatch = await getTitle(page);
    console.log(await getTitle(page));
    await expect(page).toHaveTitle(getTitleToMatch)
});

async function getUrl(page, url) {
    await page.goto(url);
}

async function getTitle(page) {
    return await page.title();
}
