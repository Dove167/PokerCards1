import fs from 'fs';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

// Load the data from the JSON file
const data = JSON.parse(fs.readFileSync('code_snippets.json', 'utf-8'));
const { cards } = data;

// Function to get a random card from the deck
function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

// Main function to start the retrieval practice app
function start() {
  console.clear();
  console.log(chalk.bold.blue("=== JavaScript Poker Card Retrieval Practice ==="));
  console.log("Welcome! Try to recall the JavaScript concept for the card shown.");
  console.log("Press any key to reveal the answer. Press 'Q' to quit at any time.\n");
  readlineSync.keyInPause("Press any key to start...");

  while (true) {
    console.clear();
    const card = getRandomCard();

    // Prompt the user
    console.log(chalk.bold.yellow(`Your card is: ${chalk.white(card.card)}`));
    console.log(chalk.cyan("\nWhat is the JavaScript concept for this card?"));

    // Wait for user to think
    const key = readlineSync.keyInPause("\nPress any key to reveal the answer, or 'Q' to quit...");

    if (key.toUpperCase() === 'Q') {
      console.log(chalk.bold.red("\nThanks for practicing! Goodbye!"));
      break;
    }

    // Reveal the answer
    console.clear();
    console.log(chalk.bold.yellow(`Card: ${chalk.white(card.card)}`));
    console.log(chalk.bold.green(`\nConcept: ${chalk.white(card.concept)}`));
    console.log(chalk.gray("\n--- Code Snippet ---"));
    console.log(chalk.green(card.snippet));
    console.log(chalk.gray("--------------------\n"));

    const continueKey = readlineSync.keyInPause("Press any key for the next card, or 'Q' to quit...");
    if (continueKey.toUpperCase() === 'Q') {
      console.log(chalk.bold.red("\nThanks for practicing! Goodbye!"));
      break;
    }
  }
}

// Start the program
start();
