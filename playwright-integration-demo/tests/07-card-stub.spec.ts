import { test, expect } from '@playwright/test';

test('Card Stub - ตรวจสอบชื่อและนามสกุล', async ({ page }) => {

  // Login จริง
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.waitForURL(/inventory\.html/);

  // STUB : card.html สำหรับ Inventory
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Inventory - Card Stub</title>
      <style>
        body {
          font-family: Arial;
          margin: 40px;
        }

        .header {
          background: #3ddc97;
          color: white;
          padding: 20px;
          font-size: 24px;
        }

        .container {
          margin-top: 30px;
        }

        .card {
          border: 1px solid #ddd;
          padding: 20px;
          margin-top: 20px;
          width: 300px;
        }
      </style>
    </head>

    <body>

      <div class="header">
        Inventory
      </div>

      <div class="container">

        <h1>Product Inventory</h1>

        <div class="card">
          <h2>Sauce Labs Backpack</h2>
          <p>Price: $29.99</p>
        </div>

        <div class="card">
          <p data-test="first-name">
            ชื่อ: PHITCHANAN
          </p>

          <p data-test="last-name">
            นามสกุล: KHANJHAN
          </p>
        </div>

      </div>

    </body>
    </html>
  `);

  // ตรวจสอบชื่อ
  await expect(
    page.locator('[data-test="first-name"]')
  ).toContainText('PHITCHANAN');

  // ตรวจสอบนามสกุล
  await expect(
    page.locator('[data-test="last-name"]')
  ).toContainText('KHANJHAN');

  // ค้างหน้าเว็บไว้ให้อาจารย์ดู
  await page.pause();
});