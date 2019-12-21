const faker = require("faker");
const puppeteer = require("puppeteer");

describe("H1 Text", () => {
  test("h1 loads correctly", async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ""
    });

    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".App-link");

    const html = await page.$eval(".App-link", e => e.innerHTML);
    expect(html).toBe("Learn React");

    browser.close();
  }, 16000);
});
