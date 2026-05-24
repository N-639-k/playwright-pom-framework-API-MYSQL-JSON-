# Navigation Guide - Playwright BDD POM

## Project Structure

```
stepDefinitions/      → Step definition files
  └─ loginSteps.ts   → Login step definitions

methods/             → Page Object Model classes
  ├─ LoginMethods.ts → Login page interactions
  └─ AccountMethods.ts → Account creation interactions

hooks/               → Cucumber hooks
  └─ hooks.ts        → Before/After setup and teardown

featureFiles/        → Gherkin feature files
  └─ login.feature   → Login scenarios

testData/            → JSON test data
  ├─ loginData.json
  └─ accountData.json

utils/               → Helper utilities
  ├─ apiHelper.ts    → API request helpers
  ├─ dbHelper.ts     → Database helpers
  └─ jsonReader.ts   → JSON data reader
```

## How to Navigate

### 1. From Step Definition to Method (Ctrl+Click)

**Example:**
In `stepDefinitions/loginSteps.ts`:

```typescript
Given("User launches application", async function () {
  const loginMethods = (this as any).loginMethods;
  await loginMethods.launchApplication(); // ← Click here with Ctrl
});
```

**Steps:**

1. Open `stepDefinitions/loginSteps.ts`
2. Find the line with method call: `loginMethods.launchApplication()`
3. Hold `Ctrl` + Click on `launchApplication`
4. Should navigate to `methods/LoginMethods.ts` line with that method

**Alternative (F12):**

1. Click on the method name
2. Press `F12` to "Go to Definition"

### 2. From Step Definition to Feature File (Reverse)

**Example:**
In `stepDefinitions/loginSteps.ts`:

```typescript
Given("User launches application", async function () {
  // The text 'User launches application' matches the feature file
});
```

**Steps:**

1. Open `featureFiles/login.feature`
2. Find: `Given User launches application`
3. Hover over the step text
4. The Cucumber extension will highlight matching step definitions
5. Ctrl+Click to navigate to step definition

### 3. From Feature File to Step Definition (Reverse)

**Steps:**

1. Open `featureFiles/login.feature`
2. Right-click on any step (e.g., "User launches application")
3. Select "Go to Definition"
4. Should jump to the matching step in `stepDefinitions/loginSteps.ts`

**Alternative:**

1. Click on a step in feature file
2. Press `F12` to go to its definition

---

## Hook Usage

### Browser Setup (Before Hook)

Located in `hooks/hooks.ts`:

```typescript
Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginMethods = new LoginMethods(page);
  // Store in context for step definitions to access
  (this as any).loginMethods = loginMethods;
});
```

### Cleanup (After Hook)

Located in `hooks/hooks.ts`:

```typescript
After(async function () {
  await browser.close();
});
```

### Accessing in Steps

In `stepDefinitions/loginSteps.ts`:

```typescript
Given("User launches application", async function () {
  const loginMethods = (this as any).loginMethods; // ← Get from context
  await loginMethods.launchApplication();
});
```

---

## POM Method Documentation

### LoginMethods

- `launchApplication()` - Navigate to login page
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `verifyDashboardPage()` - Verify successful login
- `loginToApplication(username, password)` - Complete login flow

### AccountMethods

- `navigateToAccountCreation()` - Navigate to register page
- `enterEmail(email)` - Enter email
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `confirmPassword(password)` - Confirm password
- `submitAccountForm()` - Submit form
- `verifyAccountCreationSuccess()` - Verify success
- `createAccount(email, username, password)` - Complete signup flow

---

## Troubleshooting Navigation

### If Ctrl+Click doesn't work:

1. **Reload VS Code**: `Ctrl+Shift+P` → "Reload Window"
2. **Check imports**: Ensure methods are properly imported
3. **Verify extension**: Check that "Cucumber (Gherkin) Full Support" is installed
4. **Try F12**: Alternative to Ctrl+Click

### If step definition doesn't match feature:

- Ensure the text in `Given/When/Then` exactly matches the feature file
- Example: `Given('User launches application', ...)` matches `Given User launches application`
- Check for trailing spaces or typos

### If hooks don't run:

- Ensure `hooks/*.ts` is in `cucumber.js` require path ✅ (already configured)
- Check that hooks are exported as functions ✅ (already done)
- Verify `Before` and `After` are imported from `@cucumber/cucumber` ✅ (already done)
