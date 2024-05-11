const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderPage } = require('./OrderPage');
const { ThankyouPage } = require('./ThankyouPage');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPageObj = new LoginPage(this.page);
        this.dashPageObj = new DashboardPage(this.page);
        this.checkoutPageObj = new CheckoutPage(this.page);
        this.orderPageObj = new OrderPage(this.page);
        this.thankYouPageObj = new ThankyouPage(this.page);
    }
    getLoginPage(){
        return this.loginPageObj;
    }

    getDashboardPage(){
        return this.dashPageObj;
    }

    getCheckoutPage(){
        return this.checkoutPageObj;
    }

    getOrderPage(){
        return this.orderPageObj;
    }

    getThankyouPage(){
        return this.thankYouPageObj;
    }
}

module.exports = { POManager };