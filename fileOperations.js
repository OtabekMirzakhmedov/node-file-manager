const fs = require("fs");
const path = require("path");

function readFile(filePath) {
  const fileReadStream = fs.createReadStream(filePath);

  fileReadStream.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  fileReadStream.on("end", () => {
    console.log("File reading completed.");
  });

  fileReadStream.on("error", (error) => {
    console.log("Operation Failed");
  });
}

function createFile(fileName) {
  fs.writeFile(fileName, "", (err) => {
    if (err) {
      console.log("Operation Failed");
    } else {
      console.log("File created successfully.");
    }
  });
}

function renameFile(oldFilePath, newFileName) {
  const newFilePath = path.join(path.dirname(oldFilePath), newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.log("Operation Failed");
    } else {
      console.log("File renamed successfully.");
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
  });

  fileWriteStream.on("error", (error) => {
    console.log("Operation Failed");
  });

  fileWriteStream.on("finish", () => {
    console.log("File copied successfully.");
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
    } else {
      fs.unlink(sourceFilePath, (err) => {
        if (err) {
          console.log("Operation Failed");
        } else {
          console.log("File moved successfully.");
        }
      });
    }
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Operation Failed");
    } else {
      console.log("File deleted successfully.");
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
