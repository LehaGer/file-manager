import process, { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import {HOME_DIR} from "./constantsList.js";
import TaskController from "./taskController.js";
import Mwd from "./mwd.js";

let __filename = fileURLToPath(import.meta.url);
let __dirname = HOME_DIR;

const fileManager = async () => {

    try {

        const usernameStr = process.argv[process.argv.length-1];
        const username = usernameStr.startsWith("--") ? usernameStr.split("=")[1] : "";

        const WELCOME_MSG = `Welcome to the File Manager, ${username}!\n`;
        const LEAVE_MSG = `Thank you for using File Manager, ${username}, goodbye!`;

        const rl = readline.createInterface({ input, output });

        console.log(WELCOME_MSG);
        console.log(`You are currently in ${Mwd.getCurrentDir()}\n`);

        rl.on('line', async (input) => {

            rl.pause();

            if(input === '.exit') rl.close();

            await TaskController.perform(input);

            console.log(`You are currently in ${Mwd.getCurrentDir()}\n`);

            rl.resume();

        });
        rl.on('close', () => {

            console.log(LEAVE_MSG)
            process.exit(0);

        });

    } catch (error) {

        throw error;

    }

}

await fileManager();