import { test, expect } from '@playwright/test'

test('ตรวจสอบการคำนวณ BMI และสถานะ (Overweight)', async ({ page }) => {
  const username = `status_${Date.now()}`
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

  // Input for Overweight (BMI ~24.2)
  // Height 170cm (1.7m), Weight 70kg -> 70 / 2.89 = 24.22
  const numberInputs = page.locator('input[type="number"]')
  await numberInputs.nth(0).fill('70')
  await numberInputs.nth(1).fill('170')
  await page.click('button[type="submit"]')

  await expect(page.locator('text=BMI: 24.22')).toBeVisible()
  await expect(page.locator('text=Overweight (ท้วม)')).toBeVisible()
})
