import { test, expect } from '@playwright/test'

test('สมัครสมาชิกสำเร็จและ redirect ไปหน้าเข้าสู่ระบบ', async ({ page }) => {
  const username = `user_${Date.now()}`
  const password = 'Passw0rd!'

  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/\/login$/)
  await expect(page.locator('h1')).toHaveText(/Login/i)
})
