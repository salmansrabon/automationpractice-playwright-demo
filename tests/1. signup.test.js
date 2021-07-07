const browserObject = require('../helpers/browser');
const { SignUpPage } = require('../pages/signup');
const { LoginPage, loginSelectors } = require('../pages/login');
const loginInfo = require("../projectVariables/loginCreds.json");
const userInfo = require("../projectVariables/userInfo.json");
const fs = require('fs');
const { expect } = require('chai');
const generateRandomPassword = require('../helpers/generateRandomPassword');

let page, signupPage, loginPage;

before(async () => {
    browser = await browserObject.startBrowser();
    page = await browser.newPage();
    signupPage = new SignUpPage(page);
    loginPage = new LoginPage(page);
});

describe('Signup', async () => {
    it("Signup form fillup", async () => {
        await page.goto(loginInfo.url);
        await page.waitForSelector(loginSelectors.loginLinkSelector);
        await page.click(loginSelectors.loginLinkSelector);
        let randId = Math.floor(Math.random() * 1000);
        let email = `testuser${randId}@grr.la`;
        await signupPage.initiateRegistration(String(email));
        await signupPage.clickTitle();
        await signupPage.typeFirstName(userInfo.firstName);
        await signupPage.typeLastName(userInfo.lastName);
        let password = generateRandomPassword();
        await signupPage.typePassword(password);
        await signupPage.selectBirthDate(userInfo.birthDate.day, userInfo.birthDate.month, userInfo.birthDate.year);
        await signupPage.typeAddress(userInfo.address);
        await signupPage.typeCity(userInfo.city);
        await signupPage.selectState(userInfo.state);
        await signupPage.typePostalCode(userInfo.postCode);
        await signupPage.typeMobilePhone(userInfo.mobilePhone);
        await signupPage.clickRegisterButton();

        //update userCreds
        loginInfo.userEmail = email;
        loginInfo.userPassword = password;
        fs.writeFileSync('./projectVariables/loginCreds.json', JSON.stringify(loginInfo));

        //validate signout button
        await page.waitForSelector(loginSelectors.logoutButtonSelector);
        let logoutButtonElement = await page.$(loginSelectors.logoutButtonSelector);
        expect(logoutButtonElement != null).equals(true);

        await loginPage.clickLogoutButton();

    })
})
afterEach("take screenshot on failure", async function () {
    if (this.currentTest.state !== "passed") {
        var titleName = this.currentTest.title + ".jpg";
        var imageFileName = titleName.split('\n')[0] + ".jpg"
        await page.screenshot({ path: 'output/' + "" + imageFileName.replace("\"", "").replace("\"", "").trim() + "" });

    }
});
after(async () => {
    await browser.close();
});