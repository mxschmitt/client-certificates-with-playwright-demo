import { test, expect } from '@playwright/test';

test('works', async ({ page }) => {
  await page.goto('https://localhost:1234');

  await expect(page.getByText("Hello Alice!")).toBeVisible();
});
