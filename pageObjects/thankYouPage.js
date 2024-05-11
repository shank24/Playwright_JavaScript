class thankYouPage{
    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
    }
}