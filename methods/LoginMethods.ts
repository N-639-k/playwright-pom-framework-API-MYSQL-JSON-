import { Page, expect } from '@playwright/test';

/**
 * LoginMethods - POM class for login page interactions
 * Handles user authentication and verification
 * Used in: stepDefinitions/loginSteps.ts
 */
export class LoginMethods {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Login page selectors
    usernameTextbox = 'input[name="username"]';

    passwordTextbox = 'input[name="password"]';

    loginButton = 'button[type="submit"]';

    dashboardHeader = '//h6[text()="Dashboard"]';

    /**
     * Launch the application/login page
     */
    async launchApplication() {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
            {
                waitUntil: 'domcontentloaded',
                timeout: 120000
            }
        );
    }

    /**
     * Enter username in the username field
     * @param username - Username to enter
     */
    async enterUsername(username: string) {

        await this.page
            .locator(this.usernameTextbox)
            .fill(username);
    }

    /**
     * Enter password in the password field
     * @param password - Password to enter
     */
    async enterPassword(password: string) {

        await this.page
            .locator(this.passwordTextbox)
            .fill(password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {

        await this.page
            .locator(this.loginButton)
            .click();
    }

    /**
     * Verify that the dashboard page is visible after login
     */
    async verifyDashboardPage() {

        await expect(
            this.page.locator(this.dashboardHeader)
        ).toBeVisible();
    }

    /**
     * Complete the login flow
     * @param username - Username
     * @param password - Password
     */
    async loginToApplication(
        username: string,
        password: string
    ) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLoginButton();
    }
}