const os = require('os');

// Function to print the current working directory
function printCurrentDirectory() {
    console.log(`You are currently in ${process.cwd()}`);
}

// Function to display welcome message
function displayWelcomeMessage(username) {
    console.log(`Welcome to the File Manager, ${username}!`);
    printCurrentDirectory();
}

// Function to display goodbye message
function displayGoodbyeMessage(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

// Function to handle invalid input
function handleInvalidInput() {
    console.log("Invalid input. Please enter a valid command.");
}

module.exports = { printCurrentDirectory, displayWelcomeMessage, displayGoodbyeMessage, handleInvalidInput };
