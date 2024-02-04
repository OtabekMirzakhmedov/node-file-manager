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
const {
  getEOL,
  getCPUsInfo,
  getHomeDirectory,
  getSystemUserName,
  getCPUArchitecture,
} = require("./osOperations");

function startFileManager(username) {
  displayWelcomeMessage(username);

  printCurrentDirectory();

  process.stdin.on("data", (input) => {
    const userInput = input.toString().trim();
    const [command, ...args] = userInput.split(" ");

    switch (command) {
      case ".exit":
        displayGoodbyeMessage(username);
        process.exit(0);
        break;
      case "up":
        navigateToParentDirectory();
        printCurrentDirectory();
        break;
      case "cd":
        changeWorkingDirectory(args[0]);
        printCurrentDirectory();
        break;
      case "ls":
        listFilesAndFolders();
        printCurrentDirectory();
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
      case "os":
        handleOSCommand(args);
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

function handleOSCommand(args) {
  const [operation, ...rest] = args;

  switch (operation) {
    case "--EOL":
      getEOL();
      printCurrentDirectory();
      break;
    case "--cpus":
      getCPUsInfo();
      printCurrentDirectory();
      break;
    case "--homedir":
      getHomeDirectory();
      printCurrentDirectory();
      break;
    case "--username":
      getSystemUserName();
      printCurrentDirectory();
      break;
    case "--architecture":
      getCPUArchitecture();
      printCurrentDirectory();
      break;
    default:
      handleInvalidInput();
      printCurrentDirectory();
  }
}

module.exports = { startFileManager };
