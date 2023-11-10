const { exec } = require("child_process");
const { stdout } = require("process");

let command = "arp -a";

const executeCommand = async (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(`Error: ${error}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

const executeShutdownCommand = async (address) => {
    return new Promise((resolve, reject) => {
        command = `shutdown /s /m \\\\${address}`;

        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
};

const processAddresses = async (addresses) => {
    addresses.forEach(async (address) => {
        executeShutdownCommand(address);
    });
};

executeCommand(command)
    .then((stdout) => {
        const addresses = stdout.split("\n");
        processAddresses(addresses);
    })
    .catch((error) => {
        console.error(error);
    });