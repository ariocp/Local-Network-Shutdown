const { exec } = require("child_process");

const executeCommand = async (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stdout);
            } else {
                resolve(stdout);
            }
        });
    });
}

const executeShutdownCommand = async (address) => {
    const command = `shutdown /s /m \\\\${address}`;
    return executeCommand(command);
}

const processAddresses = async (addresses) => {
    for (const address of addresses) {
        await executeShutdownCommand(address);
    }
}

module.exports = {
    executeCommand,
    executeShutdownCommand,
    processAddresses
}
