const { test, expect } = require('@playwright/test');

class OrderPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator("label[type='text']");
        this.placeOrderBtn = page.locator('.action__submit');
        this.successBtnText = page.locator("h1:has-text(' Thankyou for the order. ')");
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.orderPage = page.locator("tbody");
    }

    async verifyEmail(email) {
       await expect (this.email).toHaveText(email);
    }

    async verifyOrderConfirmation() {
        await this.placeOrderBtn.click();
        const successMsg = this.successBtnText.isVisible();
        expect(successMsg).toBeTruthy();
    }

    async getOrderId(){
        const orderID = await this.orderIdLocator.textContent();
        console.log(orderID);
        return orderID;
    }

    async clickOnOrders(){
        await this.myOrders.click();
        await this.orderPage.waitFor();
    }
}

module.exports = { OrderPage };