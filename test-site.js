import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const outDir = '/home/gagan-b/Hello/rexmo/screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runTests() {
  console.log('Launching browser with puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://127.0.0.1:4173/ ...');
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0' });

  console.log('1. Capturing Hero section...');
  await page.screenshot({ path: path.join(outDir, '01-hero.png') });

  const sections = [
    { id: '#intro', name: '02-intro.png' },
    { id: '#philosophy', name: '03-philosophy.png' },
    { id: '#services', name: '04-services.png' },
    { id: '#gallery', name: '05-gallery.png' },
    { id: '#cinematography', name: '06-cinematography.png' },
    { id: '#about', name: '07-about.png' },
    { id: '#destinations', name: '08-destinations.png' },
    { id: '#testimonials', name: '09-testimonials.png' },
    { id: '#contact', name: '10-contact.png' },
    { id: 'footer', name: '11-footer.png' }
  ];

  for (const s of sections) {
    console.log(`Scrolling to ${s.id}...`);
    await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, s.id);
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, s.name) });
  }

  // Test Lightbox interaction
  console.log('Testing Lightbox open on first gallery item...');
  await page.evaluate(() => {
    const el = document.querySelector('#gallery');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 500));

  const firstCard = await page.$('#gallery .columns-1 > div');
  if (firstCard) {
    await firstCard.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, '12-lightbox-opened.png') });
    console.log('Lightbox opened screenshot captured.');

    // Close with Escape key
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));
  }

  // Test Mobile view
  console.log('Testing Mobile View (390 x 844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '13-mobile-hero.png') });

  // Mobile menu open
  console.log('Testing Mobile Drawer...');
  const menuBtn = await page.$('header button[aria-label="Toggle menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outDir, '14-mobile-drawer.png') });
  }

  await browser.close();
  console.log('All automated visual tests completed successfully!');
  console.log('Console Errors caught:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
