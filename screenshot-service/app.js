const express = require('express');
const { chromium } = require('playwright-chromium');
const fs = require('fs').promises;
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
};

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;

  if (!url || !isValidUrl(url)) {
    return res.status(400).send('Invalid or missing URL parameter.');
  }

  let browser = null;
  const tempFilePath = path.join(os.tmpdir(), `screenshot-${crypto.randomBytes(16).toString('hex')}.png`);

  try {
    console.log(`Attempting to launch browser for URL: ${url}`);
    browser = await chromium.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });
    console.log('Browser launched.');

    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();
    console.log(`Navigating to ${url}...`);

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('Navigation complete, waiting 2 seconds for content to load...');
    await page.waitForTimeout(5000); // wait 2 seconds before taking the screenshot

    console.log(`Taking screenshot...`);

    await page.screenshot({
      path: tempFilePath,
      fullPage: true
    });
    console.log(`Screenshot saved to ${tempFilePath}`);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="screenshot-${new URL(url).hostname}.png"`);
    res.sendFile(tempFilePath, {}, async (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (!res.headersSent) {
          res.status(500).send('Error sending screenshot file.');
        }
      }
      try {
        await fs.unlink(tempFilePath);
        console.log(`Temporary file ${tempFilePath} deleted.`);
      } catch (unlinkErr) {
        console.error('Error deleting temporary file:', unlinkErr);
      }
    });

  } catch (error) {
    console.error('Error during screenshot process:', error);
    if (!res.headersSent) {
        if (error.message.includes('timeout')) {
            res.status(504).send('Navigation timeout while trying to reach the URL.');
        } else if (error.message.includes('net::ERR_NAME_NOT_RESOLVED') || error.message.includes('Target page, context or browser has been closed')) {
            res.status(400).send('Could not resolve or navigate to the provided URL.');
        } else {
            res.status(500).send('An error occurred while taking the screenshot.');
        }
    }
    try {
      await fs.access(tempFilePath);
      await fs.unlink(tempFilePath);
      console.log(`Temporary file ${tempFilePath} deleted after error.`);
    } catch (cleanupErr) {
    }
  } finally {
    if (browser) {
      try {
        await browser.close();
        console.log('Browser closed.');
      } catch (closeErr) {
        console.error('Error closing browser:', closeErr);
      }
    }
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Screenshot service listening at http://0.0.0.0:${port}`);
});
