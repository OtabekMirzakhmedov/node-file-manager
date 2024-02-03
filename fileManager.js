const {
  printCurrentDirectory,
  displayWelcomeMessage,
  displayGoodbyeMessage,
  handleInvalidInput,
} = require("./utils");
const { listFilesAndFolders } = require("./directoryListing");
const { changeWorkingDirectory, navigateToParentDirectory } = require("./navigation");

function startFileManager(username) {
  displayWelcomeMessage(username);

  printCurrentDirectory();

  process.stdin.on("data", (input) => {
    const userInput = input.toString().trim();
    const [operation, ...args] = userInput.split(" ");

    switch (operation) {
      case ".exit":
        displayGoodbyeMessage(username);
        process.exit(0);
        break;
      case "up":
        navigateToParentDirectory();
        break;
      case "cd":
        changeWorkingDirectory(args[0]);
        break;
      case "ls":
        listFilesAndFolders();
        break;
      case "cwd":
        printCurrentDirectory();
        break;
      default:
        handleInvalidInput();
    }
  });

  process.on("SIGINT", () => {
    console.log(); // Add a new line for readability
    displayGoodbyeMessage(username);
    process.exit(0);
  });
}

module.exports = { startFileManager };
