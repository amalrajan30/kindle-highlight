import puppeteer from "puppeteer";
import { getHighLight } from "./getHighlight";
import { login } from "./login";

const startUrl = "https://read.amazon.com/kp/notebook";

export const syncHighlights = async (
  username: string,
  password: string,
  executablePath: string | undefined = undefined
) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
  });
  const page = await browser.newPage();
  await page.goto(startUrl);
  await login(page, username, password);
  await getHighLight(page);
  await browser.close();
};
