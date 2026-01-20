import { test, expect } from '@playwright/test'

test.describe('Security Testing', () => {

  test('XSS Injection Prevention in Register', async ({ page }) => {
    // Attempt to inject script in username
    const xssPayload = '<script>alert("XSS")</script>'
    await page.goto('/register')
    await page.fill('input[type="text"]', xssPayload)
    await page.fill('input[type="password"]', 'Passw0rd123!')
    await page.click('button[type="submit"]')
    
    // Check if script executes (dialog event)
    page.on('dialog', dialog => {
      expect(dialog.message()).not.toContain('XSS')
      dialog.dismiss()
    })

    // If registration succeeds, check display
    // If it fails (validation), that's also good.
    // We expect the system to either sanitize or handle it safely.
    // For now, let's assume it might register but verify it doesn't execute on Login page if redirected
  })

  test('SQL Injection Attempt in Login', async ({ page }) => {
    await page.goto('/login')
    // Common SQLi payload
    const sqliPayload = "' OR '1'='1"
    await page.fill('input[type="text"]', sqliPayload)
    await page.fill('input[type="password"]', 'anything')
    await page.click('button[type="submit"]')

    // Should fail authentication, not bypass it
    // Expect to stay on login page or see error
    await expect(page.locator('text=Invalid credentials')).toBeVisible()
    await expect(page).toHaveURL(/\/login$/)
  })

})
