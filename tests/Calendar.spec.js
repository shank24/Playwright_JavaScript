const { test, expect } = require('@playwright/test');

test.only("@WEB Calendar Test", async ({ page }) => {

    const monthVal = "12";
    const dateVal = "24";
    const yearVal = "2027";
    const expectedList = [monthVal,dateVal.yearVal];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div .react-date-picker__inputGroup").click();
    //Year Two Clicks
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(yearVal).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthVal) - 1).click();
    await page.locator("//abbr[text()='" + dateVal + "']").click();

    //Assertion
    const multipleValues = await page.locator("div .react-date-picker__inputGroup [inputmode='numeric']");

    for (let index = 0; index < multipleValues.length; index++) {
        const value = multipleValues[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }

});