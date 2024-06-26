const { test, expect } = require('@playwright/test');

test.only("@WEB Child Window Handle Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    
    await getUrl(page, "https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    

    //Wait For event to happen - a new page
    const [newPage]= await Promise.all([
        //Listen for new page - Pending/Rejected/Fulfilled
        
        context.waitForEvent('page'),
        documentLink.click(),
    ]) //New Page is opened

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    //console.log(arrayText);
    const domain = arrayText[1].split(" ")[0]
    const name = domain.split(".")[0];

    //console.log(domain);
    //console.log(name);
    //console.log(text);

    //Switching Back to Parent Page
    await userName.fill(domain);
    //await page.pause();
    console.log(await userName.textContent());
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
