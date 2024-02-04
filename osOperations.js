const os = require("os");

function getEOL() {
  console.log(`Default system End-Of-Line (EOL): ${os.EOL}`);
}

function getCPUsInfo() {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: Model - ${cpu.model}, Clock rate - ${(
        cpu.speed / 1000
      ).toFixed(2)} GHz`
    );
  });
}

function getHomeDirectory() {
  console.log(`Home directory: ${os.homedir()}`);
}

function getSystemUserName() {
  console.log(`Current system user name: ${os.userInfo().username}`);
}

function getCPUArchitecture() {
  console.log(`CPU architecture: ${os.arch()}`);
}

module.exports = {
  getEOL,
  getCPUsInfo,
  getHomeDirectory,
  getSystemUserName,
  getCPUArchitecture,
};
