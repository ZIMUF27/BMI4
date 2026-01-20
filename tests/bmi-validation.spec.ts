import { test, expect } from '@playwright/test'

test('ไม่สามารถคำนวณ BMI ได้ถ้าข้อมูลไม่ครบ', async ({ page }) => {
  const username = `validation_${Date.now()}`
  const password = 'Passw0rd!'

  // Register & Login
  await page.goto('/register')
  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/login$/)

  await page.fill('input[type="text"]', username)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')

  // Wait for login to complete
  await expect(page).toHaveURL(/\/dashboard$/)

  // Try submit without inputs
  await page.click('button[type="submit"]')
  
  // Should not see BMI result
  await expect(page.locator('text=BMI:')).not.toBeVisible()

  // Input only weight
  const numberInputs = page.locator('input[type="number"]')
  await numberInputs.nth(0).fill('70')
  await page.click('button[type="submit"]')
  await expect(page.locator('text=BMI:')).not.toBeVisible()
})
