const fs = require("fs");
const path = require("path");
const {
    printCurrentDirectory,
} = require("./utils");

function readFile(filePath) {
  const fileReadStream = fs.createReadStream(filePath);

  fileReadStream.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  fileReadStream.on("end", () => {
    console.log("File reading completed.");
    printCurrentDirectory();
  });

  fileReadStream.on("error", (error) => {
    console.log("Operation Failed");
    printCurrentDirectory();
  });
}

function createFile(fileName) {
  fs.writeFile(fileName, "", (err) => {
    if (err) {
      console.log("Operation Failed");
      printCurrentDirectory();
    } else {
      console.log("File created successfully.");
      printCurrentDirectory();
    }
  });
}

function renameFile(oldFilePath, newFileName) {
  const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.log("Operation Failed");
      printCurrentDirectory();
    } else {
      console.log("File renamed successfully.");
      printCurrentDirectory();
    }
  });
}

function copyFile(sourceFilePath, targetDirectory) {
  const targetFilePath = path.join(
    targetDirectory,
    path.basename(sourceFilePath)
  );

  const fileReadStream = fs.createReadStream(sourceFilePath);
  const fileWriteStream = fs.createWriteStream(targetFilePath);

  fileReadStream.pipe(fileWriteStream);

  fileReadStream.on("error", (error) => {
    console.log("Operation Failed");
    printCurrentDirectory();
  });

  fileWriteStream.on("error", (error) => {
    console.log("Operation Failed");
    printCurrentDirectory();
  });

  fileWriteStream.on("finish", () => {
    console.log("File copied successfully.");
    printCurrentDirectory();
  });
}

function moveFile(sourceFilePath, targetDirectory) {
  const targetFilePath = path.join(
    targetDirectory,
    path.basename(sourceFilePath)
  );

  fs.copyFile(sourceFilePath, targetFilePath, (err) => {
    if (err) {
      console.log("Operation Failed");
      printCurrentDirectory();
    } else {
      fs.unlink(sourceFilePath, (err) => {
        if (err) {
          console.log("Operation Failed");
          printCurrentDirectory();
        } else {
          console.log("File moved successfully.");
          printCurrentDirectory();
        }
      });
    }
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Operation Failed");
      printCurrentDirectory();
    } else {
      console.log("File deleted successfully.");
      printCurrentDirectory();
    }
  });
}

module.exports = {
  readFile,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
};
