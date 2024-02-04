const fs = require("fs");
const crypto = require("crypto");

function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const fileStream = fs.createReadStream(filePath);

    fileStream.on("data", (data) => {
      hash.update(data);
    });

    fileStream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`Hash of file '${filePath}': ${fileHash}`);
      resolve(fileHash);
    });

    fileStream.on("error", (error) => {
      console.error("Operation failed");
      resolve(null);
    });
  });
}

module.exports = { calculateHash };
