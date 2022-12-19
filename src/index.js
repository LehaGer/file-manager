import process, { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const fileManager = async () => {

    try {

        const usernameStr = process.argv[process.argv.length-1];
        const username = usernameStr.startsWith("--")
            ? usernameStr.split("=")[1]
            : "";

        const rl = readline.createInterface({ input, output });

        console.log(`Welcome to the File Manager, ${username}!\n`);

        rl.on('close', () => {

            console.log(`\nThank you for using File Manager, ${username}, goodbye!`)
            process.exit(0);

        });
        rl.on('line', (input) => {

            if(input === '.exit') rl.close();

            console.log(`Received: ${input}`);

        });

    } catch (error) {

        throw error;

    }

}

await fileManager();