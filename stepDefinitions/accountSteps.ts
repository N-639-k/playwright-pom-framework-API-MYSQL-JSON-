import {
    Given,
    When,
    Then
} from '@cucumber/cucumber';

import { expect } from '@playwright/test';
import { AccountMethods } from '../methods/AccountMethods';
import { accountData } from '../utils/jsonReader';

/**
 * Account Creation Step Definitions
 * 
 * This file demonstrates the POM pattern with:
 * - Hooks from hooks/hooks.ts (browser setup)
 * - Methods from methods/AccountMethods.ts (page interactions)
 * - Test data from testData/accountData.json
 * 
 * Navigation:
 * - Ctrl+Click on AccountMethods to go to methods/AccountMethods.ts
 * - Ctrl+Click on accountData to go to testData/accountData.json
 * - Right-click step in feature file to go to step definition
 */

let accountMethods: AccountMethods;

Given('User navigates to account creation page', async function () {
    // Get the page from context (set in hooks/hooks.ts)
    const page = (this as any).page;
    
    // Initialize AccountMethods with the page
    accountMethods = new AccountMethods(page);
    
    // Store in context for other steps
    (this as any).accountMethods = accountMethods;
    
    // Execute the step
    await accountMethods.navigateToAccountCreation();
});

When('User enters account details', async function () {
    accountMethods = (this as any).accountMethods;
    
    // Use test data from accountData.json
    await accountMethods.createAccount(
        accountData.email,
        accountData.username,
        accountData.password
    );
});

Then('Account should be created successfully', async function () {
    accountMethods = (this as any).accountMethods;
    
    await accountMethods.verifyAccountCreationSuccess();
});

/**
 * Alternative: Step by step account creation
 * Uncomment and use in feature file as alternative
 */

When('User enters email {string}', async function (email: string) {
    accountMethods = (this as any).accountMethods;
    await accountMethods.enterEmail(email);
});

When('User enters username {string}', async function (username: string) {
    accountMethods = (this as any).accountMethods;
    await accountMethods.enterUsername(username);
});

When('User enters password {string}', async function (password: string) {
    accountMethods = (this as any).accountMethods;
    await accountMethods.enterPassword(password);
});

When('User confirms password {string}', async function (password: string) {
    accountMethods = (this as any).accountMethods;
    await accountMethods.confirmPassword(password);
});

When('User submits the account form', async function () {
    accountMethods = (this as any).accountMethods;
    await accountMethods.submitAccountForm();
});
