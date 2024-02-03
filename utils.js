const os = require("os");

function printCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

function displayWelcomeMessage(username) {
  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();
}

function displayGoodbyeMessage(username) {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

function handleInvalidInput() {
  console.log("Invalid input. Please enter a valid command.");
}

module.exports = {
  printCurrentDirectory,
  displayWelcomeMessage,
  displayGoodbyeMessage,
  handleInvalidInput,
};
