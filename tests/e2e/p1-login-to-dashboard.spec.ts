import { test, expect } from '@playwright/test'

const roles = [
  { value: 'admin', route: '/admin', heading: '管理者ダッシュボード' },
  { value: 'nurse', route: '/nurse', heading: '看護士ダッシュボード' },
  { value: 'caregiver', route: '/caregiver', heading: '介護士ダッシュボード' }
]

for (const r of roles) {
  test(`${r.value} navigates to ${r.route}`, async ({ page }) => {
    await page.goto('http://localhost:5173/login')
    await page.locator(`input[name=role][value=${r.value}]`).click()
    await page.getByRole('button', { name: '進む' }).click()
    await expect(page).toHaveURL(new RegExp(`${r.route}$`))
    await expect(page.locator(`text=${r.heading}`)).toBeVisible()
  })
}
