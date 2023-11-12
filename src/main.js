const { executeCommand, processAddresses } = require("./utils/shutdown");

const bootstrap = async () => {
    try {
        const command = "arp -a";
        const stdout = await executeCommand(command);
        const addresses = stdout.split("\n");
        await processAddresses(addresses);
    } catch (error) {
        console.error(error);
    }
}

bootstrap();
