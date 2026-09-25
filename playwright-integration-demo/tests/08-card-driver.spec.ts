import {
  test,
  expect,
  BrowserContext,
  Page
} from '@playwright/test';

// DRIVER
// ทำหน้าที่แทน Login Layer
async function driverOpenCard(
  context: BrowserContext
): Promise<Page> {

  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();

  // เรียก Inventory จริง
  await page.goto(
    'https://www.saucedemo.com/inventory.html'
  );

  await expect(
    page.locator('.inventory_list')
  ).toBeVisible();

  return page;
}

// TEST
test('Card Driver - เรียก card.html', async ({ browser }) => {

  const context = await browser.newContext();

  try {

    const page = await driverOpenCard(context);

    await expect(
      page.locator('.inventory_list')
    ).toBeVisible();

  } finally {

    await context.close();

  }

});