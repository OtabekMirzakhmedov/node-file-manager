const fs = require('fs');
const zlib = require('zlib');

// Function to compress a file using the Brotli algorithm
function compressFile(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputFilePath);
        const writeStream = fs.createWriteStream(outputFilePath);

        const brotliCompress = zlib.createBrotliCompress();

        readStream.pipe(brotliCompress).pipe(writeStream);

        writeStream.on('finish', () => {
            resolve(outputFilePath);
        });

        writeStream.on('error', (error) => {
            reject(error);
        });
    });
}

// Function to decompress a Brotli-compressed file
function decompressFile(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(inputFilePath);
        const writeStream = fs.createWriteStream(outputFilePath);

        const brotliDecompress = zlib.createBrotliDecompress();

        readStream.pipe(brotliDecompress).pipe(writeStream);

        writeStream.on('finish', () => {
            resolve(outputFilePath);
        });

        writeStream.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = { compressFile, decompressFile };
