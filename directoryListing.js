const fs = require("fs");
const path = require("path");

// Function to list files and folders in the current directory
function listFilesAndFolders() {
  const currentDirectory = process.cwd();

  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.log("Unable to read directory.");
      return;
    }

    const directories = [];
    const regularFiles = [];

    files.forEach((file) => {
      const fullPath = path.join(currentDirectory, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        directories.push(file);
      } else {
        regularFiles.push(file);
      }
    });

    directories.sort();
    regularFiles.sort();

    // Determine maximum lengths for Name and Type columns
    const maxLengthName =
      Math.max(
        ...directories.map((dir) => dir.length),
        ...regularFiles.map((file) => file.length)
      ) + 2; // Add padding
    const maxLengthType = "Type".length + 2; // Add padding

    // Print header
    console.log("-".repeat(30 + maxLengthName + maxLengthType));
    console.log(`Index\t|\t${padCenter("Name", maxLengthName)}\t|\tType`);
    console.log("-".repeat(30 + maxLengthName + maxLengthType)); // Line separating header from content

    // Print directories
    directories.forEach((directory, index) => {
      console.log(
        `${index + 1}\t|\t${padCenter(directory, maxLengthName)}\t|\tDirectory`
      );
    });

    // Print regular files
    regularFiles.forEach((file, index) => {
      console.log(
        `${directories.length + index + 1}\t|\t${padCenter(
          file,
          maxLengthName
        )}\t|\tFile`
      );
    });
    console.log("-".repeat(30 + maxLengthName + maxLengthType));
  });
}

// Function to pad the string to the center with spaces
function padCenter(str, len) {
  const padSize = len - str.length;
  const padStart = Math.floor(padSize / 2);
  const padEnd = padSize - padStart;
  return " ".repeat(padStart) + str + " ".repeat(padEnd);
}

module.exports = { listFilesAndFolders };
