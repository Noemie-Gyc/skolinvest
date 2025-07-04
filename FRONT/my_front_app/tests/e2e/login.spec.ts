import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
    await page.goto('http://localhost:3000/admin-login');

    // Expect a title "to contain" a substring.
    await expect(page.getByRole("heading", { name: "ESPACE ADMINISTRATEUR", level: 1 })).toBeVisible();
});