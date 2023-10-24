const { exec } = require('child_process');

function shutdownMachine(ipAddresses) {
    ipAddresses.forEach((ipAddress) => {
        const command = process.platform === 'win32' ? `shutdown /s /m \\\\${ipAddress} /t 0` : `ssh user@${ipAddress} "poweroff"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`err (${ipAddress}): ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`err (${ipAddress}): ${stderr}`);
                return;
            }
            console.log(`капут (${ipAddress})`);
            console.log(`stdout: ${stdout}`);
        });
    });
}

const targetIPs = ['192.168.0.102', '127.0.0.1', '192.168.0.1'];
shutdownMachine(targetIPs);
