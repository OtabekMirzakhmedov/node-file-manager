const {
    printCurrentDirectory,
    displayWelcomeMessage,
    displayGoodbyeMessage,
    handleInvalidInput,
  } = require("./utils");
  const { listFilesAndFolders } = require("./directoryListing");
  const {
    changeWorkingDirectory,
    navigateToParentDirectory,
  } = require("./navigation");
  const {
    readFile,
    createFile,
    renameFile,
    copyFile,
    moveFile,
    deleteFile,
  } = require("./fileOperations");
  
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
        case "cat":
          readFile(args[0]);
          break;
        case "add":
          createFile(args[0]);
          break;
        case "rn":
          renameFile(args[0], args[1]);
          break;
        case "cp":
          copyFile(args[0], args[1]);
          break;
        case "mv":
          moveFile(args[0], args[1]);
          break;
        case "rm":
          deleteFile(args[0]);
          break;
        case "cwd":
          printCurrentDirectory();
          break;
        default:
          handleInvalidInput();
      }
    });
  
    process.on("SIGINT", () => {
      console.log();
      displayGoodbyeMessage(username);
      process.exit(0);
    });
  }
  
  module.exports = { startFileManager };
  