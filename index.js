const { startFileManager } = require("./fileManager");
const {
  navigateToParentDirectory,
  changeWorkingDirectory,
} = require("./navigation");
const { listFilesAndFolders } = require("./directoryListing");

const username = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--username="))
  .split("=")[1];

startFileManager(username);
