import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || (existsSync('/opt/google/chrome/chrome') ? '/opt/google/chrome/chrome' : undefined),
});
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const errors = [];
const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
async function scroll(page, top) {
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

try {
  for (const [width, height] of [[1440, 900], [1280, 800], [768, 1024], [390, 844], [360, 800]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    page.setDefaultTimeout(8000);
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const language of ['en', 'th']) {
      if (language === 'th') {
        await page.locator('.dock-settings').click();
        await page.getByRole('button', { name: /Switch language/ }).click();
        await page.keyboard.press('Escape');
        await page.locator('#interface-settings').waitFor({ state: 'detached' });
      }
      const geometry = await page.locator('.nav-dock').evaluate((dock) => {
        const rect = dock.getBoundingClientRect();
        const labels = [...dock.querySelectorAll('.dock-label, .dock-label-compact, .dock-settings-label')]
          .filter((node) => getComputedStyle(node).display !== 'none');
        return {
          fits: rect.left >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          labelsFit: labels.every((node) => {
            const r = node.getBoundingClientRect();
            const parent = node.parentElement.getBoundingClientRect();
            return r.top >= parent.top && r.bottom <= parent.bottom && r.left >= parent.left && r.right <= parent.right && node.scrollHeight <= node.clientHeight;
          }),
        };
      });
      assert.deepEqual(geometry, { fits: true, overflow: false, labelsFit: true }, `${width}/${language}: dock/label bounds`);
      for (const id of [...sections, ...sections.toReversed()]) {
        const top = await page.locator(`#${id}`).evaluate((node) => node.getBoundingClientRect().top + scrollY);
        await scroll(page, top);
        await page.waitForFunction((target) => document.querySelector('.dock-link[aria-current]')?.getAttribute('href') === `#${target}`, id);
      }
      if (width > 760) {
        const { top, distance } = await page.locator('.skills-scroll-stage').evaluate((node) => ({
          top: node.getBoundingClientRect().top + scrollY - 64,
          distance: node.offsetHeight - document.querySelector('.skills-scroll-sticky').offsetHeight,
        }));
        for (const fraction of [0.04, 0.24, 0.44, 0.64, 0.9]) {
          await scroll(page, top + distance * fraction);
          assert.equal(await page.locator('.dock-link[aria-current]').getAttribute('href'), '#skills');
          assert.ok(await page.locator('.skills-navigation').evaluate((node) => node.getBoundingClientRect().bottom < document.querySelector('.nav-dock').getBoundingClientRect().top), 'Dock must not obscure Skills controls');
        }
      }
    }
    await page.locator('.dock-settings').focus();
    assert.equal(await page.locator('.dock-settings').evaluate((node) => getComputedStyle(node).outlineStyle), 'solid');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement?.classList.contains('utility-button'));
    await page.keyboard.press('Tab');
    assert.ok(await page.locator('.theme-button').evaluate((node) => node === document.activeElement));
    const theme = await page.locator('html').getAttribute('data-theme');
    await page.keyboard.press('Enter');
    assert.notEqual(await page.locator('html').getAttribute('data-theme'), theme);
    await page.keyboard.press('Escape');
    await page.locator('#interface-settings').waitFor({ state: 'detached' });
    assert.ok(await page.locator('.dock-settings').evaluate((node) => node === document.activeElement));
    await page.locator('.dock-settings').click();
    await page.mouse.click(10, 10);
    await page.locator('#interface-settings').waitFor({ state: 'detached' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.dock-link[href="#skills"]').click();
    await page.waitForFunction(() => document.querySelector('.dock-link[aria-current]')?.getAttribute('href') === '#skills');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('.dock-link[aria-current]')?.getAttribute('href') === '#skills');
    console.log(`PASS ${width} × ${height}: EN/TH labels, forward/reverse active section, pinned Skills, keyboard/settings/theme, reduced motion, #skills reload`);
    await page.close();
  }
  assert.deepEqual(errors, [], 'Console/hydration/runtime errors');
} finally {
  await browser.close();
}
