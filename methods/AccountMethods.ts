import { Page, expect } from '@playwright/test';

/**
 * AccountMethods - POM class for account creation and management
 * Handles all account-related interactions
 */
export class AccountMethods {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Account creation form selectors
    accountModal = 'div[class*="modal"]';
    emailInput = 'input[type="email"]';
    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';
    confirmPasswordInput = 'input[name="confirmPassword"]';
    submitButton = 'button[type="submit"]';
    successMessage = '//div[contains(text(), "Account created")]';

    /**
     * Navigate to account creation page
     */
    async navigateToAccountCreation() {
        await this.page.goto('https://example.com/register');
    }

    /**
     * Enter email in account creation form
     * @param email - User email address
     */
    async enterEmail(email: string) {
        await this.page.locator(this.emailInput).fill(email);
    }

    /**
     * Enter username in account creation form
     * @param username - Username for the account
     */
    async enterUsername(username: string) {
        await this.page.locator(this.usernameInput).fill(username);
    }

    /**
     * Enter password in account creation form
     * @param password - Password for the account
     */
    async enterPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
    }

    /**
     * Confirm password in account creation form
     * @param password - Password confirmation
     */
    async confirmPassword(password: string) {
        await this.page.locator(this.confirmPasswordInput).fill(password);
    }

    /**
     * Submit the account creation form
     */
    async submitAccountForm() {
        await this.page.locator(this.submitButton).click();
    }

    /**
     * Verify account was created successfully
     */
    async verifyAccountCreationSuccess() {
        await expect(
            this.page.locator(this.successMessage)
        ).toBeVisible();
    }

    /**
     * Complete account creation flow
     * @param email - Email address
     * @param username - Username
     * @param password - Password
     */
    async createAccount(email: string, username: string, password: string) {
        await this.enterEmail(email);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.confirmPassword(password);
        await this.submitAccountForm();
    }
}
