class dashBoardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cardTitle = page.locator(".card-body b");
        this.cartLocator = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName) {
        
        const titles = console.log(await this.cardTitle.allTextContents());
        console.log(titles);
        const countOfProducts = await this.products.count();

        for (let i = 0; i < countOfProducts; i++) {
            if (await this.products.nth(i).locator('b').textContent() == productName) {
                //Add To cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }

    async navigateToCart(){
        await this.cartLocator.click();
    }
}

module.exports = {dashBoardPage};