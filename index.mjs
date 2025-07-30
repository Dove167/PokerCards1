import fs from 'fs';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

// Load the data from the JSON file
const data = JSON.parse(fs.readFileSync('code_snippets.json', 'utf-8'));

// Function to display the menu
function displayMenu() {
  console.clear(); // Clear the screen
  console.log(chalk.bold.blue("=== Poker JavaScript Code Snippets ==="));
  console.log(chalk.bold("\nSelect an option (shorthand inputs available):\n"));

  // Display options in a table-like format with shorthand notation
  data.options.forEach((option, index) => {
    const shorthand = index < 13 ? (index + 1).toString() : 'N/A';
    console.log(chalk.green(`${option.code_id.padEnd(20)}: ${option.title} ${shorthand !== 'N/A' ? `[${shorthand}]` : ''}`));
  });

  console.log(chalk.yellow("\nR: Ranking"));
  console.log(chalk.red("Q: Quit\n"));
  console.log(chalk.cyan("Shorthand: 1=1111, 2=2222, ..., 11=jackjackjackjack, 12=queenqueenqueenqueen, 13=KingKingkingking, 0=jokerjokerjokerjoker\n"));
}

// Function to show the ranking
function showRanking() {
  console.clear();
  console.log(chalk.bold.blue("=== Ranking ==="));
  console.log(chalk.bold("\nLabels and Their Meanings:\n"));
  console.log(chalk.green(`Hearts  : ${data.ranking.Hearts}`));
  console.log(chalk.blue(`Spades  : ${data.ranking.Spades}`));
  console.log(chalk.magenta(`Clubs   : ${data.ranking.Clubs}`));
  console.log(chalk.cyan(`Diamonds: ${data.ranking.Diamonds}\n`));
  waitForUserInput();
}

// Function to show code snippets
function showCodeSnippets(codeId) {
  console.clear();
  const selectedOption = data.options.find(option => option.code_id === codeId);
  if (selectedOption) {
    console.log(chalk.bold.blue(`=== ${selectedOption.title} ===\n`));
    selectedOption.code.forEach(snippet => {
      console.log(chalk.bold(`${snippet.label}:`), chalk.gray(snippet.snippet));
    });
  } else {
    console.log(chalk.red("Invalid selection. Please try again."));
  }
  waitForUserInput();
}

// Function to wait for user input before returning to the menu
function waitForUserInput() {
  console.log(chalk.yellow("\nPress any key to continue..."));
  readlineSync.keyInPause();
}

// Function to convert shorthand input to code_id
function convertShorthandInput(input) {
  // Mapping of shorthand inputs to code_ids
  const shorthandMap = {
    '1': '1111',
    '2': '2222',
    '3': '3333',
    '4': '4444',
    '5': '5555',
    '6': '6666',
    '7': '7777',
    '8': '8888',
    '9': '9999',
    '10': '10101010',
    '11': 'jackjackjackjack',
    '12': 'queenqueenqueenqueen',
    '13': 'KingKingkingking',
    '0': 'jokerjokerjokerjoker'
  };
  
  // Return the mapped code_id if it exists, otherwise return the input as is
  return shorthandMap[input] || input;
}

// Main function to start the program
function start() {
  while (true) {
    displayMenu();
    const input = readlineSync.question(chalk.bold("Enter your choice: ")).trim();
    const convertedInput = convertShorthandInput(input);
    
    if (convertedInput === 'R' || convertedInput === 'r') {
      showRanking();
    } else if (convertedInput === 'Q' || convertedInput === 'q') {
      console.log(chalk.bold.red("\nGoodbye!"));
      break;
    } else {
      showCodeSnippets(convertedInput);
    }
  }
}

// Start the program
start();