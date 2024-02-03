const { startFileManager } = require('./fileManager');
const { navigateToParentDirectory, changeWorkingDirectory } = require('./navigation');
const { listFilesAndFolders } = require('./directoryListing');

// Extract username from command line arguments
const username = process.argv.slice(2).find(arg => arg.startsWith('--username=')).split('=')[1];

// Start the file manager
startFileManager(username);
