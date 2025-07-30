import fs from 'fs';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

// Load the data from the JSON file
const conceptsData = JSON.parse(fs.readFileSync('concepts.json', 'utf-8'));

// Function to get a random concept
function getRandomConcept() {
  const randomIndex = Math.floor(Math.random() * conceptsData.concepts.length);
  return conceptsData.concepts[randomIndex];
}

// Main function to start the program
function start() {
  console.clear();
  console.log(chalk.bold.blue("=== JavaScript Retrieval Practice ==="));
  console.log(chalk.bold.green("\nPress Enter to draw a card and practice, or type 'Q' to quit.\n"));

  while (true) {
    const input = readlineSync.question(chalk.bold("Enter your choice: ")).trim().toLowerCase();

    if (input === 'q') {
      console.log(chalk.bold.red("\nGoodbye!"));
      break;
    } else if (input === '') {
      console.clear();
      const concept = getRandomConcept();
      console.log(chalk.bold.yellow(`\nCard: ${concept.card}`));
      console.log(chalk.bold.cyan(`\nWhat is "${concept.concept}"?`));
      readlineSync.question(chalk.gray("\nPress Enter to reveal the explanation..."));
      console.log(chalk.green(`\nExplanation: ${concept.explanation}\n`));
      if (concept.code_example) {
        console.log(chalk.bold.magenta("Code Example:\n"));
        console.log(chalk.gray(concept.code_example));
        console.log("\n");
      }
      readlineSync.keyInPause(chalk.yellow("Press any key to continue..."));
      console.clear();
      console.log(chalk.bold.blue("=== JavaScript Retrieval Practice ==="));
      console.log(chalk.bold.green("\nPress Enter to draw a card and practice, or type 'Q' to quit.\n"));
    } else {
      console.log(chalk.red("Invalid input. Press Enter to draw a card, or 'Q' to quit."));
    }
  }
}

// Start the program
start();