const signUpSelectors = {
    titleSelector: '[name=id_gender]',
    emailSelector: "#email_create",
    submitSelector: "#SubmitCreate",
    firstNameSelector: "#customer_firstname",
    lastNameSelector: "#customer_lastname",
    passwordSelector: "#passwd",
    addressSelector: "[name=address1]",
    citySelector: "[name=city]",
    stateSelector: "#id_state",
    postcodeSelector: "[name=postcode]",
    mobilePhoneSelector: "#phone_mobile",
    registerButtonSelector: "#submitAccount",
}
class SignUpPage {
    constructor(page) {
        this.page = page;
    }
    async initiateRegistration(email) {
        await this.page.waitForSelector(signUpSelectors.emailSelector);
        await this.page.type(signUpSelectors.emailSelector, email);
        await this.page.click(signUpSelectors.submitSelector);
    }
    async clickTitle() {
        await this.page.waitForSelector(signUpSelectors.titleSelector);
        let titleElement = await this.page.$$(signUpSelectors.titleSelector);
        await titleElement[1].click();
    }
    async typeFirstName(firstName) {
        await this.page.waitForSelector(signUpSelectors.firstNameSelector);
        await this.page.type(signUpSelectors.firstNameSelector, firstName);
    }
    async typeLastName(lastName) {
        await this.page.waitForSelector(signUpSelectors.lastNameSelector);
        await this.page.type(signUpSelectors.lastNameSelector, lastName);
    }
    async typePassword(password) {
        await this.page.waitForSelector(signUpSelectors.passwordSelector);
        await this.page.type(signUpSelectors.passwordSelector, password);
    }
    async selectBirthDate(days, months, years) {
        await this.page.waitForSelector("#days");
        await this.page.selectOption("#days", days);
        await this.page.waitForSelector("#months");
        await this.page.selectOption("#months", months);
        await this.page.waitForSelector("#years");
        await this.page.selectOption("#years", years);
    }
    async typeAddress(address) {
        await this.page.waitForSelector(signUpSelectors.addressSelector);
        await this.page.type(signUpSelectors.addressSelector, address);
    }
    async typeCity(city) {
        await this.page.waitForSelector(signUpSelectors.citySelector);
        await this.page.type(signUpSelectors.citySelector, city);
    }
    async selectState(state) {
        await this.page.waitForSelector(signUpSelectors.stateSelector);
        await this.page.selectOption(signUpSelectors.stateSelector, { label: state })
    }
    async typePostalCode(postcode) {
        await this.page.waitForSelector(signUpSelectors.postcodeSelector);
        await this.page.type(signUpSelectors.postcodeSelector, postcode);
    }
    async typeMobilePhone(mobilephone) {
        await this.page.waitForSelector(signUpSelectors.mobilePhoneSelector);
        await this.page.type(signUpSelectors.mobilePhoneSelector, mobilephone);
    }
    async clickRegisterButton() {
        await this.page.waitForSelector(signUpSelectors.registerButtonSelector);
        await this.page.click(signUpSelectors.registerButtonSelector);
    }

}
module.exports = { SignUpPage, signUpSelectors }