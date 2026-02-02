import{expect} from '@playwright/test';
class end2endPracticeLoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("#login-button");
    this.userName = page.locator("#user-name");
    this.passWord = page.locator("#password");
  }
  async hitUrl() {
    await this.page.goto("https://www.saucedemo.com/");
  }
  async validLogin(username, password) {
    const credentialTextsUser = await this.page
      .locator("#login_credentials")
      .innerText();
    //convert text into array
    const usersArr = credentialTextsUser
      .split("\n")
      .map((user) => user.trim())
      .filter((user) => user !== "Accepted usernames are:");
    //dynamic user selection
    const selectedUser = usersArr.find((user) => user === username);
    await this.userName.fill(selectedUser);
    const credentialTextsPassword = await this.page
      .locator(".login_password")
      .innerText();
    //convert text into array
    const passwordArr = credentialTextsPassword
      .split("\n")
      .map((pass) => pass.trim())
      .filter((pass) => pass !== "Password for all users:");
    //dynamic password
    const selectedPassword = passwordArr.find((pass) => pass === password);
    await this.passWord.fill(selectedPassword);
    await this.signInButton.click();
  }
  async validateLoginPageLanding() {
    await expect(this.signInButton).toBeVisible();
  }
}
export default end2endPracticeLoginPage;
