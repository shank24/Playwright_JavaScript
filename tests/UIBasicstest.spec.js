const {test} = require('@playwright/test');

test("First Test", async ({browser})=> {
    browser.newContext()
});