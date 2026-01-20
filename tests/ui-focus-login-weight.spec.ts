import { test, expect } from '@playwright/test'

test.describe('Focus UI Testing: Login & BMI Calculation', () => {

  test('User Login and BMI Weight Input Flow', async ({ page }) => {
    // 1. Setup User (Register first to ensure clean state)
    const username = `ui_test_${Date.now()}`
    const password = 'Passw0rd123!'

    await test.step('1. Register New User', async () => {
      await page.goto('/register')
      await page.fill('input[type="text"]', username)
      await page.fill('input[type="password"]', password)
      await page.click('button[type="submit"]')
      await expect(page).toHaveURL(/\/login$/)
    })

    // 2. Login
    await test.step('2. Login to Dashboard', async () => {
      await page.goto('/login')
      await page.fill('input[type="text"]', username)
      await page.fill('input[type="password"]', password)
      await page.click('button[type="submit"]')
      await expect(page).toHaveURL(/\/dashboard$/)
    })

    // 3. Weight/Height Input
    await test.step('3. Input Weight and Calculate', async () => {
      // Define variables for BMI calculation
      const weight = 75
      const height = 180
      
      // BMI Formula: weight (kg) / height (m)^2
      const heightInMeters = height / 100
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2) // 23.15
      
      console.log(`Testing with Weight: ${weight}kg, Height: ${height}cm, Expected BMI: ${bmiValue}`)

      // Use simpler selectors based on existing tests (bmi-flow.spec.ts)
      const numberInputs = page.locator('input[type="number"]')
      // Weight (first input)
      await numberInputs.nth(0).fill(weight.toString())
      // Height (second input)
      await numberInputs.nth(1).fill(height.toString())

      // Submit
      await page.click('button[type="submit"]')

      // Verify Result with calculated value
      await expect(page.locator(`text=BMI: ${bmiValue}`)).toBeVisible()
      await expect(page.locator('text=Overweight (ท้วม)')).toBeVisible()
    })

    // 4. Verify Result (Step merged into 3 for atomic flow, but keeping structure if needed)
  })

})
