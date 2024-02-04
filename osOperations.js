const os = require('os');

// Function to get the default system End-Of-Line (EOL) and print it to the console
function getEOL() {
    console.log(`Default system End-Of-Line (EOL): ${os.EOL}`);
}

// Function to get host machine CPUs info and print it to the console
function getCPUsInfo() {
    const cpus = os.cpus();
    console.log(`Overall amount of CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock rate - ${(cpu.speed / 1000).toFixed(2)} GHz`);
    });
}

// Function to get home directory and print it to the console
function getHomeDirectory() {
    console.log(`Home directory: ${os.homedir()}`);
}

// Function to get current system user name and print it to the console
function getSystemUserName() {
    console.log(`Current system user name: ${os.userInfo().username}`);
}

// Function to get CPU architecture for which Node.js binary has compiled and print it to the console
function getCPUArchitecture() {
    console.log(`CPU architecture: ${os.arch()}`);
}

module.exports = { getEOL, getCPUsInfo, getHomeDirectory, getSystemUserName, getCPUArchitecture };
