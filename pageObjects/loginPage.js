class loginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator('#login');
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(email,password){
    await this.userName.fill(email);
    await this.password.fill(password);
    await this.signInBtn.click();
    await this.page.waitForLoadState('networkidle');
    }

    async getTitleOfPage(page){
       console.log(await this.page.title());
    }
}

module.exports = {loginPage};