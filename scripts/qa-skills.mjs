import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

// Start the app first, then run `npm run qa:skills` (BASE_URL can target a production preview).
const executablePath = process.env.CHROME_PATH || (existsSync('/opt/google/chrome/chrome') ? '/opt/google/chrome/chrome' : undefined);
const browser = await chromium.launch({ executablePath, headless: true });
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const errors = [];
const viewports = [[1440, 900], [1280, 800], [768, 1024], [390, 844], [360, 800], [1280, 620], [1024, 600]];

async function settledScroll(page, top) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function geometry(page) {
  return page.locator('.skills-scroll-stage').evaluate((stage) => ({
    start: stage.getBoundingClientRect().top + window.scrollY - 64,
    distance: stage.offsetHeight - document.querySelector('.skills-scroll-sticky').offsetHeight,
  }));
}

try {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height } });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    for (const language of ['en', 'th']) {
      if (language === 'th') {
        await page.getByRole('button', { name: 'Open interface settings' }).click();
        await page.getByRole('button', { name: /Switch language/ }).click();
        await page.waitForFunction(() => document.documentElement.lang === 'th');
        await page.keyboard.press('Escape');
      }
      const horizontal = width > 760 && height >= 620;
      await page.waitForFunction((expected) => document.querySelector('#skills').classList.contains('is-horizontal') === expected, horizontal);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}/${language}: page overflow`);
      assert.equal(await page.locator('.skill-group').count(), 5);
      assert.equal(await page.locator('.skill-technologies li').count(), 40, 'Preserve every technology');

      if (horizontal) {
        const { start, distance } = await geometry(page);
        for (const [index, fraction] of [0.04, 0.24, 0.44, 0.64, 0.9].entries()) {
          await settledScroll(page, start + distance * fraction);
          const visible = await page.locator('.skill-group').nth(index).evaluate((group) => {
            const frame = document.querySelector('.skills-window').getBoundingClientRect();
            const list = group.querySelector('ul').getBoundingClientRect();
            const title = group.querySelector('h3').getBoundingClientRect();
            return {
              pinnedTop: document.querySelector('.skills-scroll-sticky').getBoundingClientRect().top,
              listFits: list.left >= frame.left - 1 && list.right <= frame.right + 1 && list.bottom <= frame.bottom + 1,
              titleFits: title.top >= frame.top && title.bottom <= frame.bottom + 1,
            };
          });
          assert.ok(Math.abs(visible.pinnedTop - 64) < 1, `${width}/${language}: Skills moved vertically before group ${index + 1} finished`);
          assert.ok(visible.listFits && visible.titleFits, `${width}/${language}: group ${index + 1} clipped`);
        }
        await settledScroll(page, start + distance + 200);
        assert.ok(await page.locator('.skills-scroll-sticky').evaluate((node) => node.getBoundingClientRect().top < 0), 'Pin must release after the last group');
        await settledScroll(page, start + distance * 0.44);
        assert.equal(await page.locator('.skills-scroll-sticky').evaluate((node) => node.getBoundingClientRect().top), 64, 'Reverse scrolling must re-enter the pin');
      } else {
        assert.equal(await page.locator('.skills-scroll-sticky').evaluate((node) => getComputedStyle(node).position), 'static');
        const rows = await page.locator('.skill-group').evaluateAll((nodes) => nodes.map((node) => {
          const { top, bottom, left, right } = node.getBoundingClientRect();
          return { top, bottom, left, right };
        }));
        for (let index = 0; index < rows.length; index++) {
          assert.ok(rows[index].left >= 0 && rows[index].right <= width);
          if (index) assert.ok(rows[index].top >= rows[index - 1].bottom, 'Static groups must be stacked and readable');
        }
      }
    }
    console.log(`PASS ${width} × ${height}: EN/TH, complete content, pin/release or static layout`);
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const { start, distance } = await geometry(page);
  await settledScroll(page, start + distance * 0.3);
  await page.mouse.move(720, 440);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 500);
  await page.waitForFunction((previous) => scrollY > previous + 200, before);
  assert.equal(await page.locator('.skills-scroll-sticky').evaluate((node) => node.getBoundingClientRect().top), 64, 'Actual wheel input must leave Skills pinned');

  const selector = page.locator('.skills-selectors button').last();
  await selector.focus();
  assert.equal(await selector.evaluate((node) => getComputedStyle(node).outlineStyle), 'solid');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.skills-selectors button:last-child').getAttribute('aria-current') === 'step');
  await page.waitForFunction(() => {
    const group = document.querySelector('.skill-group:last-child').getBoundingClientRect();
    const frame = document.querySelector('.skills-window').getBoundingClientRect();
    return Math.abs(group.left - frame.left) < 1;
  });
  assert.equal(await page.locator('.skills-scroll-sticky').evaluate((node) => node.getBoundingClientRect().top), 64);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('#skills').classList.contains('is-horizontal'));
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.skills-list')).transform === 'none');
  assert.equal(await page.locator('.skills-list').evaluate((node) => getComputedStyle(node).transform), 'none');
  assert.equal(await page.locator('.skills-scroll-sticky').evaluate((node) => getComputedStyle(node).position), 'static');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => document.querySelector('#skills').classList.contains('is-horizontal'));
  assert.deepEqual(errors, [], 'Browser console/hydration/runtime errors');
  console.log('PASS wheel input, keyboard group selection, visible focus, live reduced motion, browser errors');
} finally {
  await browser.close();
}
