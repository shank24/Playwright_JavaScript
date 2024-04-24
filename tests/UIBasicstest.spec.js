const {test} = require('@playwright/test');

test("First Test", async ({browser})=> {
    
    const context = await browser.newContext();
    const page = await context.newPage();

});