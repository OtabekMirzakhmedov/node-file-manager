const fs = require('fs');
const path = require('path');

function readFile(filePath) {
    const fileReadStream = fs.createReadStream(filePath);

    fileReadStream.on('data', (chunk) => {
        console.log(chunk.toString());
    });

    fileReadStream.on('end', () => {
        console.log("File reading completed.");
    });

    fileReadStream.on('error', (error) => {
        console.log("Error reading file:", error);
    });
}

function createFile(fileName) {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.log("Error creating file:", err);
        } else {
            console.log("File created successfully.");
        }
    });
}

function renameFile(oldFilePath, newFileName) {
    const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.log("Error renaming file:", err);
        } else {
            console.log("File renamed successfully.");
        }
    });
}

function copyFile(sourceFilePath, targetDirectory) {
    const targetFilePath = path.join(targetDirectory, path.basename(sourceFilePath));

    const fileReadStream = fs.createReadStream(sourceFilePath);
    const fileWriteStream = fs.createWriteStream(targetFilePath);

    fileReadStream.pipe(fileWriteStream);

    fileReadStream.on('error', (error) => {
        console.log("Error reading file:", error);
    });

    fileWriteStream.on('error', (error) => {
        console.log("Error writing file:", error);
    });

    fileWriteStream.on('finish', () => {
        console.log("File copied successfully.");
    });
}

// Function to move (rename and copy) a file
function moveFile(sourceFilePath, targetDirectory) {
    const targetFilePath = path.join(targetDirectory, path.basename(sourceFilePath));

    fs.copyFile(sourceFilePath, targetFilePath, (err) => {
        if (err) {
            console.log("Error moving file:", err);
        } else {
            fs.unlink(sourceFilePath, (err) => {
                if (err) {
                    console.log("Error deleting source file after move:", err);
                } else {
                    console.log("File moved successfully.");
                }
            });
        }
    });
}

// Function to delete a file
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log("Error deleting file:", err);
        } else {
            console.log("File deleted successfully.");
        }
    });
}

module.exports = { readFile, createFile, renameFile, copyFile, moveFile, deleteFile };
