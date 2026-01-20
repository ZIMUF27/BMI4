import { test, expect } from '@playwright/test'

test('เข้าสู่ระบบไม่สำเร็จเมื่อใส่รหัสผ่านผิด', async ({ page }) => {
  const username = `fail_login_${Date.now()}`
  const password = 'CorrectPassw0rd!'
  
  // Register first
  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/login$/)

  // Try login with wrong password
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', 'WrongPass!')
  await page.click('button[type="submit"]')

  await expect(page.locator('text=Invalid credentials')).toBeVisible()
  await expect(page).toHaveURL(/\/login$/)
})
