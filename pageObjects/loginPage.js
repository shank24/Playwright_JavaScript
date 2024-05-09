class loginPage {
    constructor(page) {
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator('#login');
    }
}