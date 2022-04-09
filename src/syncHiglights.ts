import prompts, {PromptObject} from 'prompts';
import puppeteer from 'puppeteer';
import Conf from 'conf';
import {getHighLight} from './getHighlight';
import {login} from './login';

const startUrl = 'https://read.amazon.com/kp/notebook';
const conf = new Conf();

const promptQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'email',
    message: 'Enter your email address associated with your Amazon account',
    validate: (value: string) =>
      value.length > 0 || 'Please enter your email address',
    initial: (conf.get('email') as string) || '',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password',
    validate: (value: string) =>
      value.length > 0 || 'Please enter your password',
  },
];

export const syncHighlights = async (
  executablePath: string | undefined = undefined,
) => {
  const {email, password} = await prompts(promptQuestions);
  conf.set('email', email);
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
  });
  const page = await browser.newPage();
  await page.goto(startUrl);
  await login(page, email, password);
  await getHighLight(page);
  await browser.close();
};
