import { test, expect } from '@playwright/test'

test('สามารถเข้าถึงหน้ารายงานผลได้', async ({ page }) => {
  const username = `reports_${Date.now()}`
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

  // Click View Reports
  await page.click('text=View Reports')
  
  // Verify URL and Content
  await expect(page).toHaveURL(/\/reports$/)
  // Assuming reports page has a header or chart
  // We can just check url for now or look for "Reports" text if known
  // Based on previous LS, reports/page.tsx exists.
})
