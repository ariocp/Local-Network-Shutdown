const { exec } = require('child_process');
const net = require('net');
const { nextTick } = require('process');

function foo(chance) {
    const random = Math.random();

    if (random <= chance) {
        const command = process.platform === 'win32' ? 'shutdown /s /t 0' : 'sudo poweroff';

        setTimeout(() => {
            exec(command, (error) => {
                if (error) {
                    console.error(error);
                } else {
                    const client = net.connect(80, 'localhost', () => {
                        while (true) {
                            client.write('!');
                        }
                    });
                }
            });
        }, 1000);
    } else {
        for (let i = 0; i < 3; i++) {
            console.log('?');
        }
    }
}

nextTick(() => {
    foo(0);
});
