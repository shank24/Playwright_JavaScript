const { test, expect } = require('@playwright/test');

test.only("Browser Context Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
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
