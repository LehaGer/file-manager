import process, { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import { fileURLToPath } from 'node:url';

const fileManager = async () => {

    try {

        const usernameStr = process.argv[process.argv.length-1];
        const username = usernameStr.startsWith("--")
            ? usernameStr.split("=")[1]
            : "";

        let __filename = fileURLToPath(import.meta.url);
        let __dirname = os.homedir();

        const rl = readline.createInterface({ input, output });

        console.log(`Welcome to the File Manager, ${username}!\n`);
        console.log(`You are currently in ${__dirname}\n`);

        rl.on('close', () => {

            console.log(`Thank you for using File Manager, ${username}, goodbye!`)
            process.exit(0);

        });
        rl.on('line', async (input) => {

            rl.pause();

            if(input === '.exit') rl.close();

            console.log(`You are currently in ${__dirname}\n`);

            rl.resume();

        });

    } catch (error) {

        throw error;

    }

}

await fileManager();