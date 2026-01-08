class LoginPractice
{
    constructor(page)
    {
        this.page = page;
        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.loginButton = page.locator("#login-button");
    }

    async goto()
    {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async validLogin(user,password)
    {
        await this.username.fill(user);
        await this.password.fill(password);
        await this.loginButton.click();
        this.page.on("dialog", (dialog) => dialog.accept());
    }
}

export default {LoginPractice};