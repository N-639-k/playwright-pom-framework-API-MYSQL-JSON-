import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginMethods } from '../methods/LoginMethods';

let browser: Browser;
let page: Page;
let loginMethods: LoginMethods;

setDefaultTimeout(60 * 1000);

Before(async function () {
    console.log('Execution Started');
    const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
    browser = await chromium.launch({
        headless: isCI ? true : false
    });
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(120000);
    loginMethods = new LoginMethods(page);
    (this as any).browser = browser;
    (this as any).page = page;
    (this as any).loginMethods = loginMethods;
});

After(async function () {
    console.log('Execution Completed');
    if (browser) {
        await browser.close();
    }
});