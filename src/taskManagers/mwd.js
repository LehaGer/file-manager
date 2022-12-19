import { access, constants, readdir } from 'node:fs/promises';
import * as path from 'node:path';
import { INVALID_INPUT_ERROR_MSG, OPERATION_FAILED_ERROR_MSG, HOME_DIR } from '../constants.js';

class Mwd {

    static currentDirname = HOME_DIR;

    static isCorrectFormat = async (input) => {

        if(input[0] === "up" && input.length === 1) {

            return true;

        } else if(input[0] === "cd" && input.length >= 2) {

            try {

                const inputArg = input.filter((val, index) => index !== 0).join(' ');

                await access(path.resolve(this.currentDirname, `${inputArg}`), constants.F_OK);

                return true;

            } catch (error) {

                return false;

            }

        } else if(input[0] === "ls" && input.length === 1) {

            return true;

        } else {

            return false;

        }

    }

    static checkInputFormat = async (input) => {

        if(!await this.isCorrectFormat(input)) {

            throw new Error(INVALID_INPUT_ERROR_MSG);

        }

    }

    static perform = async (input) => {

        input = input.trim().split(" ");
        
        await this.checkInputFormat(input);

        try {

            if(input[0] === "up") {

                this.currentDirname = path.resolve(this.currentDirname, '../');

            } else if (input[0] === "cd") {

                const inputArg = input.filter((val, index) => index !== 0).join(' ');

                this.currentDirname = path.resolve(this.currentDirname, `${inputArg}`);

            } else if (input[0] === "ls") {

                const fileList = [];

                for (const file of await readdir(this.currentDirname)) {

                    fileList.push(file);

                }

                console.table(fileList);

            }

        } catch (e) {

            throw new Error(OPERATION_FAILED_ERROR_MSG);

        }

    }

    static getCurrentDir = () => {

        return this.currentDirname;

    }

    static setCurrentDir = (newDirPath) => {

        this.currentDirname = newDirPath;

    }

}

export default Mwd;