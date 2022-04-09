import { Page } from "puppeteer";

export const login = async (page: Page, username: string, password: string) => {
  console.log("Logging in...");
  const emailInput = await page.waitForSelector("#ap_email");
  const passwordInput = await page.waitForSelector("#ap_password");
  const loginButton = await page.waitForSelector("#signInSubmit");

  if (emailInput && passwordInput && loginButton) {
    await emailInput.type(username);
    await passwordInput.type(password);
    await loginButton.click();
    await page.waitForNavigation();
  }
  return page;
};
