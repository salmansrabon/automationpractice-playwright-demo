const playwright = require('playwright');
require('events').EventEmitter.defaultMaxListeners = Infinity;

async function startBrowser() {
    let browser;
    try {
        browser = await playwright['chromium'].launch({
            headless: false,
            defaultViewport: null,
            devtools: false,
            args: [
                '--start-maximized',
                "--disable-web-security",
                "--disable-features=IsolateOrigins,site-per-process",
                "--window-size=2280,1366"
            ]
        });
    } 
    catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

module.exports = { startBrowser }