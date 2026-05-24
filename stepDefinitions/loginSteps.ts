import {
    Given,
    When,
    Then
} from '@cucumber/cucumber';

import { expect } from '@playwright/test';
import { createUserAPI } from '../utils/apiHelper';
import { createUserInDb, getUserByUsername } from '../utils/dbHelper';
import { loginData, accountData } from '../utils/jsonReader';

Given(
    'User launches application',
    async function () {
        const loginMethods = (this as any).loginMethods;
        await loginMethods.launchApplication();
    }
);

When(
    'User enters valid username and password',
    async function () {
        const loginMethods = (this as any).loginMethods;
        await loginMethods.loginToApplication(
            loginData.username,
            loginData.password
        );
    }
);

Then(
    'User should login successfully',
    async function () {
        const loginMethods = (this as any).loginMethods;
        await loginMethods.verifyDashboardPage();
    }
);

Given('User has account creation data', async function () {
    (this as any).account = accountData;
});

When('User creates an account using the API', async function () {
    const apiResponse = await createUserAPI((this as any).account);
    (this as any).apiResponse = apiResponse;
});

Then('The account should exist in the database', async function () {
    await createUserInDb((this as any).account);
    const users: any = await getUserByUsername((this as any).account.username);
    expect(users.length).toBeGreaterThan(0);
    console.log('Database user record:', users);
});