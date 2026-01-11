# E2E Testing with Playwright

This project uses Playwright for end-to-end testing. Playwright provides reliable cross-browser testing with automatic waiting and powerful debugging tools.

## Browser Configuration

Tests run on **Chrome (Chromium)** and **Firefox** only.

## Test Files

All E2E tests are located in the `tests/` directory:

- `login.spec.ts` - User authentication flows (7 scenarios)
- `registration.spec.ts` - User registration flows (7 scenarios)
- `navigation.spec.ts` - Navigation and menu tests (3 scenarios)
- `races.spec.ts` - Races and rides management (7 scenarios)

**Total: ~24 E2E test scenarios**

## Running Tests

### Run all tests (headless mode)

```bash
npm run e2e
```

### Run tests with UI mode (recommended for development)

```bash
npm run e2e:ui
```

### Run tests in headed mode (see browser)

```bash
npm run e2e:headed
```

### Debug mode (step through tests)

```bash
npm run e2e:debug
```

### Run specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run specific test by name

```bash
npx playwright test -g "should successfully login"
```

## Configuration

The Playwright configuration is in `playwright.config.ts`. Key settings:

- **Base URL**: http://localhost:5173
- **Browsers**: Chromium and Firefox only
- **Auto-start dev server**: Yes (automatically runs `npm run dev`)
- **Parallel execution**: Enabled for faster test runs
- **Trace on retry**: Captures trace for failed tests

## Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Debugging Tips

1. Use `--headed` flag to see the browser
2. Use `--debug` flag to step through tests
3. Use `page.pause()` in tests to pause execution
4. View traces in the HTML report for failed tests
5. Use UI mode (`npm run e2e:ui`) for the best debugging experience

## Browser Support

Tests run on:

- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ❌ WebKit (Safari) - disabled for this project

You can modify which browsers to test in `playwright.config.ts`.

## CI/CD

For continuous integration, use:

```bash
npx playwright test --reporter=github
```

## Test Structure

Each test file follows this pattern:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("should do something", async ({ page }) => {
    // Test steps
    await page.goto("/path");
    await expect(page.locator("selector")).toBeVisible();
  });
});
```

## Migration from Cypress

This project was migrated from Cypress to Playwright. Key differences:

| Cypress                 | Playwright                     |
| ----------------------- | ------------------------------ |
| `cy.visit()`            | `await page.goto()`            |
| `cy.get()`              | `page.locator()`               |
| `cy.contains()`         | `page.locator('text=...')`     |
| `cy.click()`            | `await page.click()`           |
| `cy.type()`             | `await page.fill()`            |
| `.should('be.visible')` | `await expect().toBeVisible()` |

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
