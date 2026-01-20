import { test, expect } from '@playwright/test'

test('ผู้ใช้ที่ยังไม่เข้าสู่ระบบต้องถูก Redirect ไปหน้า Login เมื่อเข้า Dashboard', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login$/) // หรือหน้า login ที่ next-auth redirect ไป
  
  // ตรวจสอบว่ามีช่อง login
  await expect(page.locator('input[type="password"]')).toBeVisible()
})
