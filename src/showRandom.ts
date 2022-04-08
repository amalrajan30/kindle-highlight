import fs from "fs";

const highlightsPath = "../temp/highlights.json";

const getRandomHighlight = () => {
  if (!fs.existsSync(highlightsPath)) {
    console.log(
      "It seems like you don't have any highlights yet. Please run `kindle-highlight update` to sync your highlights."
    );
    return null;
  }
  const allBooks = JSON.parse(
    fs.readFileSync(highlightsPath, "utf8")
  );
  const randomBookIndex = Math.floor(Math.random() * allBooks.length);
  const randomBook = allBooks[randomBookIndex];
  const randomHighlightIndex = Math.floor(
    Math.random() * randomBook.highlights.length
  );
  const randomHighlight = randomBook.highlights[randomHighlightIndex];
  return {
    bookTitle: randomBook.bookTitle,
    highlight: randomHighlight.highlight,
  };
};

export const showRandomHighlight = () => {
  const randomHighlight = getRandomHighlight();
  if (!randomHighlight) {
    return;
  }
  console.log(
    `${randomHighlight.highlight} \n\n - ${randomHighlight.bookTitle}`
  );
};
