require("dotenv").config(); //including the dotenv package files to handle all the bootstrap for us
const playwright = require("playwright");
const browserType = "chromium"; // chrome
//passing in the login credentials by Environment Variables
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
async function main() {
  const browser = await playwright[browserType].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://instagram.com"); // Opening Instagram page
  await page.waitForLoadState("load");
  // wait until the page is loaded because Instagram is a single page application
  await page.waitForTimeout(3000);
  const inputEmail = await page.$("[name='username']"); //unique element of the input field
  await inputEmail.type(email, 2000);
  const inputPassword = await page.$("[name='password']");
  await inputPassword.type(password, 2000);
  await inputPassword.press("Enter"); //in order to submit our login credentials
  await page.waitForTimeout(5000);
  // closes the modal by clicking on Not Now
  const notNow = await page.$("'Not Now'");
  await notNow.click();
  await page.waitForTimeout(5000);
  const notNow2 = await page.$("'Not Now'");
  await notNow2.click();
  let current = 0;
  while (true) {
    // only get unliked images
    let elements = await page.$$('[class="_aamw"]');
    console.log(elements);
    // stop if there are no new items
    if (elements.length - 1 == current) break;
    for (; current < elements.length; current++) {
      const element = elements[current];
      // scrolls into view
      await element.hover();
      console.log("hovered");
      await page.waitForTimeout(2000);
      // randomly like every third image
      //   if (Math.random() > 0.3) {
      await element.click();
      //   const like = await page.$("[aria-label='Like']");
      //   like.click();
      //   }
    }
  }
  console.log("Finished the script.");
  await browser.close();
}
main();
