import { Page } from "puppeteer";
import fs from "fs-extra";

interface Highlight {
  pageNo: string;
  highlight: string;
}

interface BookHighlight {
  bookTitle: string;
  highlights: Highlight[] | null;
}

const getAllHighlights = async (page: Page) => {
  // get wrapper element
  const container = await page.waitForSelector("#kp-notebook-annotations");

  // get all highlights in the container
  await page.waitForTimeout(10000);
  const allHighlights = await container?.$$(".a-spacing-base");
  if (!allHighlights) {
    return null;
  }

  let highlights: Highlight[] = [];

  console.log(`Saving ${allHighlights.length} highlights`);
  for (const highlightDiv of allHighlights) {
    const header = await (
      await highlightDiv.$("#annotationHighlightHeader")
    )?.evaluate((el) => el.textContent);
    const pageNo = header?.split("|")[1]?.trim();

    // get content
    const highlight = await (
      await highlightDiv.$("#highlight")
    )?.evaluate((el) => el.textContent);

    highlights = [
      ...highlights,
      { pageNo: pageNo || "", highlight: highlight || "" },
    ];
  }

  return highlights;
};

export const getHighLight = async (page: Page) => {
  const allBooks = await page.$$("h2");

  let allHighlights: BookHighlight[] = [];

  for (const book of allBooks) {
    await book.evaluate((el) => el.parentElement?.click());
    const title = await book.evaluate((el) => el.textContent);
    console.log(`Getting highlights for ${title}`);

    const highlights = await getAllHighlights(page);
    allHighlights = [
      ...allHighlights,
      {
        bookTitle: title || "",
        highlights,
      },
    ];
  }

  fs.outputFileSync("./temp/highlights.json", JSON.stringify(allHighlights));
};
