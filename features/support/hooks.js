const { After, Before, AfterStep, BeforeStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

    //Page Object Manager Object Instantiation
    this.POManagerObj = new POManager(this.page);
});


BeforeStep({ tags: "@foo" }, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});


// Asynchronous Promise
After(function () {
    console.log("Ending Script Execution");
});