import process, {stdin as input, stdout as output} from "node:process";
import * as readline from "node:readline/promises";
import TaskController from "./taskManagers/taskController.js";
import Mwd from "./taskManagers/mwd.js";

const fileManager = async () => {

    try {

        const username = process.argv.reduce((accumulator, arg) => {
            console.log(arg);
            if(arg.startsWith('--') && arg.slice(2, arg.search("=")) === "username") {
                return arg.split("=")[1];
            } else {
                return "";
            }
        }, "");

        const WELCOME_MSG = `Welcome to the File Manager, ${username}!\n`;
        const LEAVE_MSG = `Thank you for using File Manager, ${username}, goodbye!`;

        const rl = readline.createInterface({input, output});

        console.log(WELCOME_MSG);
        console.log(`You are currently in ${Mwd.getCurrentDir()}\n`);

        rl.on("line", async (input) => {

            rl.pause();

            if (input === ".exit") rl.close();

            await TaskController.perform(input);

            console.log(`You are currently in ${Mwd.getCurrentDir()}\n`);

            rl.resume();

        });
        rl.on("close", () => {

            console.log(LEAVE_MSG);
            process.exit(0);

        });

    } catch (error) {

        throw error;

    }

};

await fileManager();