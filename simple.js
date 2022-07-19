const playwright = require("playwright");
const browserType = "chromium"; // chrome
//const browserType = "firefox"; // firefox
//const browserType = "webkit"; // safari
async function main() {
  // disable headless to see the browser"s action
  const browser = await playwright[browserType].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage(); //wait for the browser to create a new page by putting await
  await page.goto("http://google.com"); //opening Google page
  await page.waitForLoadState("load");
  const searchTerm = "Automation Bots"; //the term to be searched in Google searchbar
  const input = await page.$("[name='q']"); //unique element in the search bar section of inspect source
  await input.type("Automation Bots");
  await page.waitForTimeout(2000); //wait 2000 ms before pressing enter so that the entire term is typed
  await input.press("Enter");
  await page.waitForLoadState("load");
  await page.screenshot({ path: "result1.png" }); //taking screenshot of the page loaded
  await page.waitForTimeout(3000); //wait 3s after taking screenshot
  const imageClicks = await page.$("[data-hveid='CAEQBA']"); //clicking the images link
  await imageClicks.click();
  await page.waitForLoadState("load");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "result2.png" }); //taking screenshot of the new page loaded
  await page.waitForTimeout(3000);
  const imageOne = await page.$(
    "[alt='How to Build a Bot and Automate your Everyday Work']"
  ); //clicking the first image
  await imageOne.click();
  await page.waitForLoadState("load");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "result3.png" });
  await page.waitForTimeout(3000);
  await browser.close(); //close the browser once everything is done
}
main();
