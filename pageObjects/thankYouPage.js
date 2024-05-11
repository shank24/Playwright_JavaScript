const { test, expect } = require('@playwright/test');

class thankYouPage {
    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.orderIdAtPage = page.locator(".col-text");
        this.emailAtOrderPage = page.locator("div p:has-text(' creativestrikers@gmail.com ')");
    }

    async verifyOrderId(orderID) {

        for (let index = 0; index < await this.rows.count(); index++) {
            const orderNumber = await this.rows.nth(index).locator("th").textContent();
            if (orderID.includes(orderNumber)) {
                await this.rows.nth(index).locator("button").first().click();
                break;
            }
        }
    }

    async verifyOrderAndEmail(orderID, email) {
        const orderIdDetail = await this.orderIdAtPage.textContent();
        expect(await orderID.includes(orderIdDetail)).toBeTruthy();
        expect(await email.includes(this.emailAtOrderPage));
    }
}

module.exports = { thankYouPage };