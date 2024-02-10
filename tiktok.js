const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require ('puppeteer-extra-plugin-stealth');

(async () => {

  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true, blockTrackersAndAnnoyances: true, useCache: true }));
  


  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--disable-notifications'] // Add this argument to disable notifications
  });

  const page = await browser.newPage();

  await page.goto('https://www.tiktok.com/@gmk');  
  await page.waitForTimeout(2000);
  await page.click('div.css-u3m0da-DivBoxContainer.e1cgu1qo0')
  scrollDown(20)

  async function scrollDown(max_scroll){
    let numberScroll = 0;

    while (numberScroll < max_scroll) {
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(500);
            numberScroll++;
          }
    const urls = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.css-1qb12g8-DivThreeColumnContainer.eegew6e2 > div > div > div > div > div > a'), element => element.href));
          
    for (const url of urls){
      downloadVid(url)
      await page.waitForTimeout(20000)
    }
  }


  async function downloadVid(link){
    const newpage = await browser.newPage()
    await newpage.goto('https://ssstik.io/en')
    
    await page.waitForTimeout(1000);

    await newpage.type('#main_page_text', link);
    await newpage.waitForTimeout(1000);
    await newpage.click('#submit')
    await newpage.waitForTimeout(1000);
    await newpage.click('.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active.notranslate');
  }
})();

