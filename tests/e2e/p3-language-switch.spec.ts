import { test, expect } from '@playwright/test'

const base = 'http://localhost:5173'

test('language switcher updates UI text', async ({ page }) => {
  await page.goto(`${base}/login`)

  // ensure buttons exist
  await expect(page.locator('[aria-label="lang-en"]')).toBeVisible()
  await expect(page.locator('[aria-label="lang-ja"]')).toBeVisible()

  // click English and assert heading changes
  await page.locator('[aria-label="lang-en"]').click()
  await expect(page.locator('text=Login')).toBeVisible()

  // click Japanese and assert heading changes
  await page.locator('[aria-label="lang-ja"]').click()
  await expect(page.locator('text=ログイン')).toBeVisible()
})