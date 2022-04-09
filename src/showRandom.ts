import Conf from 'conf';
import chalk from 'chalk';
import {BookHighlight, Highlight} from './getHighlight';

const conf = new Conf();
const log = console.log;

const getRandomHighlight = () => {
  const allBooks = conf.get('highlights') as BookHighlight[];
  if (!allBooks) {
    log(
      chalk.white(
        "It seems like you don't have any highlights yet. Please run ",
      ) +
        chalk.cyan('kindle-highlights update') +
        chalk.white(' to sync your highlights.'),
    );
    return null;
  }

  if (allBooks.length === 0) {
    console.log('No highlights found');
    log(chalk.white("It seems like you don't have any highlights yet."));
    return null;
  }

  let randomBook: BookHighlight = allBooks[0];
  let bookHighlights: Highlight[] = [];

  // Keep trying until we find a book with highlights
  for (let index = 0; index < allBooks.length; index++) {
    const randomBookIndex = Math.floor(Math.random() * allBooks.length);
    randomBook = allBooks[randomBookIndex];
    if (randomBook.highlights && randomBook.highlights.length > 0) {
      bookHighlights = randomBook.highlights;
      break;
    }
    allBooks.splice(randomBookIndex, 1);
  }
  const randomHighlightIndex = Math.floor(
    Math.random() * bookHighlights.length,
  );
  const randomHighlight = bookHighlights[randomHighlightIndex];
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
  log(
    `${chalk.green(randomHighlight.highlight)} \n\n - ${chalk.cyan(
      randomHighlight.bookTitle,
    )}`,
  );
};
