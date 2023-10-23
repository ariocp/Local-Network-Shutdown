const { exec } = require('child_process')

function getLocalNetworkMachines(callback) {
    exec('arp -a', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }

        const machines = []

        const lines = stdout.split('\n')
        lines.forEach(line => {
            const match = line.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/)
            if (match) {
                const ipAddress = match[0]
                machines.push(ipAddress)
            }
        });

        callback(machines)
    });
}

getLocalNetworkMachines(machines => {
    console.log('local network:', machines)
})
