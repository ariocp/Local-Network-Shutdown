const { exec } = require('child_process');

function getIPAddresses(callback) {
    exec('arp -a', (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return;
        }

        if (stderr) {
            console.error(stderr);
            return;
        }

        const machines = [];

        const lines = stdout.split('\n');
        lines.forEach(line => {
            const match = line.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/);

            if (match) {
                const ipAddress = match[0];
                machines.push(ipAddress);
            }
        });

        callback(machines);
    });
}

setTimeout(() => {
    getIPAddresses(machines => {
        console.log(machines);
    });
}, 1000);