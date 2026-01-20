import { test, expect } from '@playwright/test'

test('สมัครสมาชิกซ้ำแสดงข้อความผิดพลาด', async ({ page }) => {
  const username = `dup_${Date.now()}`
  const password = 'Passw0rd!'

  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/login$/)

  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')

  await expect(page.locator('text=User already exists')).toBeVisible()
})
