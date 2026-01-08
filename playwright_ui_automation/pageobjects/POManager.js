const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {LoginPractice} = require('./LoginPractice');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.loginPractice = new LoginPractice(this.page);
    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getloginPractice()
    {
        return this.loginPractice;
    }
}
module.exports = {POManager};