const fs = require("fs");
const path = require("path");
const { printCurrentDirectory } = require("./utils");

function navigateToParentDirectory() {
  const currentDirectory = process.cwd();
  const parentDirectory = path.dirname(currentDirectory);

  if (parentDirectory !== currentDirectory) {
    process.chdir(parentDirectory);
    printCurrentDirectory();
  } else {
    console.log("You are already in the root directory.");
  }
}

function changeWorkingDirectory(directoryPath) {
  try {
    fs.accessSync(directoryPath, fs.constants.F_OK);
    process.chdir(directoryPath);
    printCurrentDirectory();
  } catch (error) {
    console.log("Directory does not exist.");
  }
}

module.exports = { navigateToParentDirectory, changeWorkingDirectory };
