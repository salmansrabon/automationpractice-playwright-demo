const browserObject = require('../helpers/browser');
const { SignUpPage } = require('../pages/signup');
const { LoginPage, loginSelectors } = require('../pages/login');
const loginInfo = require("../projectVariables/loginCreds.json");
const { expect } = require('chai');

let page, signupPage, loginPage;

before(async () => {
    browser = await browserObject.startBrowser();
    page = await browser.newPage();
    signupPage = new SignUpPage(page);
    loginPage = new LoginPage(page);
});

describe('Login', async () => {
    it("`Login-1`\nRegistered user can login succesfully", async () => {
        await page.goto(loginInfo.url);
        await loginPage.login(loginInfo.userEmail, loginInfo.userPassword);

        await page.waitForSelector(loginSelectors.logoutButtonSelector);
        let logoutButtonElement = await page.$(loginSelectors.logoutButtonSelector);
        let pageUrl = await page.url();

        Promise.resolve([
            expect(pageUrl).includes("controller=my-account"),
            expect(logoutButtonElement != null).equals(true)
        ])

        await loginPage.clickLogoutButton();

    })
    it("`Login-2`\nUnable to login if user gives wrong user creds", async () => {
        await page.goto(loginInfo.url);
        await loginPage.login(loginInfo.userEmail, "wrongPassword");
        await page.waitForSelector(loginSelectors.errorXPath);
        let [errorTextElement] = await page.$$(loginSelectors.errorXPath);
        let errorText = await page.evaluate(e => e.textContent, errorTextElement);

        expect(errorText).includes("Authentication failed");

    })
})
afterEach("take screenshot on failure", async function() {
    if (this.currentTest.state !== "passed") {
        var titleName = this.currentTest.title + ".jpg";
        var imageFileName = titleName.split('\n')[0] + ".jpg"
        await page.screenshot({ path: 'output/' + "" + imageFileName.replace("`", "").replace("`", "").trim() + "" });

    }
});
after(async () => {
    await browser.close();
});