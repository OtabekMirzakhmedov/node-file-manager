const fs = require('fs');
const path = require('path');
const { printCurrentDirectory } = require('./utils');

// Function to navigate to the parent directory
function navigateToParentDirectory() {
    const currentDirectory = process.cwd();
    const parentDirectory = path.dirname(currentDirectory);

    // Prevent navigating above root directory
    if (parentDirectory !== currentDirectory) {
        process.chdir(parentDirectory);
        printCurrentDirectory();
    } else {
        console.log("You are already in the root directory.");
    }
}

// Function to change working directory
function changeWorkingDirectory(directoryPath) {
    try {
        fs.accessSync(directoryPath, fs.constants.F_OK); // Check if directory exists
        process.chdir(directoryPath);
        printCurrentDirectory();
    } catch (error) {
        console.log("Directory does not exist.");
    }
}

module.exports = { navigateToParentDirectory, changeWorkingDirectory };
