class checkoutPage {
    constructor(page) {
        this.page = page;
        this.firstProduct = page.locator("div li");
        this.item = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutBtn = page.locator("text=Checkout");
        this.country = page.locator("[placeholder*='Country']");
        this.placeOrderBtn = page.locator('.action__submit');
        this.country = page.locator("[placeholder*='Country']");
        this.dropDownLocator = page.locator(".ta-results");
    }

    async clickUntilCheckOutBtn() {
        await this.firstProduct.first().waitFor();
        await this.item.isVisible();
        await this.checkoutBtn.click();
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


module.exports = { checkoutPage };