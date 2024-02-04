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
    calculateHash,
} = require("./hashOperations");
const {
    compressFile,
    decompressFile,
} = require("./compressionOperations");
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

    process.stdin.on("data", async (input) => {
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
                await copyFile(args[0], args[1]);
                printCurrentDirectory();
                break;
            case "mv":
                await moveFile(args[0], args[1]);
                printCurrentDirectory();
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
            case "hash":
                await calculateHash(args[0]);
                printCurrentDirectory();
                break;
            case "compress":
                await compressFile(args[0], args[1]);
                printCurrentDirectory();
                break;
            case "decompress":
                await decompressFile(args[0], args[1]);
                printCurrentDirectory();
                break;
            default:
                handleInvalidInput();
                printCurrentDirectory();
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
            break;
        case "--cpus":
            getCPUsInfo();
            break;
        case "--homedir":
            getHomeDirectory();
            break;
        case "--username":
            getSystemUserName();
            break;
        case "--architecture":
            getCPUArchitecture();
            break;
        default:
            handleInvalidInput();
    }
}

module.exports = { startFileManager };
