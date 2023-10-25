const { exec } = require('child_process');

function shutdown(ipAddress) {
    const command = process.platform === 'win32' ? `shutdown /s /m \\\\${ipAddress} /t 0` : 'sudo poweroff';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(ipAddress, error.message);
            return;
        }

        if (stderr) {
            console.error(ipAddress, stderr);
            return;
        }

        console.log(ipAddress);
        console.log(stdout);
    });
}

function shutdownMultipleIPs(ipAddresses) {
    ipAddresses.forEach((ipAddress) => {
        shutdown(ipAddress);
    });
}

const targetIPs = [];
shutdownMultipleIPs(targetIPs);
