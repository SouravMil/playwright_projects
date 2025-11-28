class LoginPage{
    constructor(page){
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.checkbox = page.locator('input[type="checkbox"]');
    }
    async goTo()
    {
       await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }
    async validLogin(username,password)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('.card-body').first().waitFor();
    }
}
module.exports = {LoginPage};