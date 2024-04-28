const { test, expect } = require('@playwright/test');



test.only("Assignment Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Sign In Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator('#login');
    //Cart Locators
    const products = page.locator(".card-body")
    const cardTitle = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';
    const cartLocator = page.locator("[routerlink*='cart']");


    await getUrl(page, "https://rahulshettyacademy.com/client/");
    console.log(await getTitle(page));

    await userName.fill("creativestrikers@gmail.com");
    await password.fill("Abcd@1234");
    await signIn.click();
    await page.waitForLoadState('networkidle');

    //console.log(await cardTitle.nth(0).textContent());
    const titles = console.log(await cardTitle.allTextContents());
    console.log(titles);
    const countOfProducts = await products.count();

    for (let i = 0; i < countOfProducts; i++) {
        if(await products.nth(i).locator('b').textContent() == productName)
        {
            //Add To cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }        
    }

    await cartLocator.click();
    const isPresent =  page.locator ("h3:has-text('ZARA COAT 3')").isVisible();
    expect (isPresent).toBeTruthy();


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
