const { expect } = require("@playwright/test");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstProduct = page.locator("div li");
        this.checkoutBtn = page.locator("text=Checkout");
        this.country = page.locator("[placeholder*='Country']");
        this.placeOrderBtn = page.locator('.action__submit');
        this.country = page.locator("[placeholder*='Country']");
        this.dropDownLocator = page.locator(".ta-results");
    }

    async clickUntilCheckOutBtn(productName) {
        await this.firstProduct.first().waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutBtn.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
    async selectCountry(countryName) {
        await this.country.pressSequentially(countryName);
        const dropDown = this.dropDownLocator;
        await dropDown.waitFor();
        const optionsCount = await dropDown.locator("button").count();

        for (let index = 0; index < optionsCount; index++) {
            const text = await dropDown.locator("button").nth(index).textContent();

            if (text === " Canada") {
                await dropDown.locator("button").nth(index).click();
                break;
            }
        }
    }
}


module.exports = { CheckoutPage };