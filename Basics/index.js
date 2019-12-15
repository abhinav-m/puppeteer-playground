require("dotenv").config();

const puppeteer = require("puppeteer");

//TODO: Add a chain of functions to test the requests
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", request => {
      // GA requests are fired as gif (or images)
      if (request.url().includes("google-analytics")) {
        console.log(request.url());
      }

      request.continue();
    });
    await page.goto(process.env.WEBSITE_URL);
    await page.screenshot({
      path: `livesite_${Date.now()}.png`,
      fullPage: true
    });
    await browser.close();
  } catch (e) {
    console.log("ERROR", e);
  }
})();
