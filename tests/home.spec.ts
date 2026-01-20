import { test, expect } from '@playwright/test'

test('หน้าแรกแสดงชื่อแอปและรหัสนักศึกษา', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText(/BMI Health Tracker/)
  await expect(page.locator('text=Student ID: 67162110559-4')).toBeVisible()
  await expect(page.locator('a[href="/login"]')).toBeVisible()
  await expect(page.locator('a[href="/register"]')).toBeVisible()
})
