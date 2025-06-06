import {test, expect} from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/dashboard/login');

  // Expect the h1 to contain this string.
await expect(page.getByRole("heading", { name: "ESPACE ADMINISTRATEUR", level: 1 })).toBeVisible();
});
