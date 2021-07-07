const loginSelectors = {
    loginLinkSelector: "a.login",
    emailSelector: "#email",
    passwordSelector: "#passwd",
    loginButtonSelector: "#SubmitLogin",
    logoutButtonSelector:"a.logout",
    errorXPath:"//li[contains(text(),'Authentication failed.')]"
}
class LoginPage {
    constructor(page) {
        this.page = page;
    }
    async typeEmail(email) {
        await this.page.waitForSelector(loginSelectors.emailSelector);
        await this.page.type(loginSelectors.emailSelector, email);
    }
    async typePassword(password) {
        await this.page.waitForSelector(loginSelectors.passwordSelector);
        await this.page.type(loginSelectors.passwordSelector, password);
    }
    async clickLoginButton() {
        await this.page.waitForSelector(loginSelectors.loginButtonSelector);
        await this.page.click(loginSelectors.loginButtonSelector);
    }
    async login(email, password) {
        await this.page.waitForSelector(loginSelectors.loginLinkSelector);
        await this.page.click(loginSelectors.loginLinkSelector);
        await this.typeEmail(email);
        await this.typePassword(password);
        await this.clickLoginButton();

    }
    async clickLogoutButton(){
        await this.page.waitForSelector(loginSelectors.logoutButtonSelector);
        await this.page.click(loginSelectors.logoutButtonSelector);
    }
}
module.exports = { LoginPage, loginSelectors }