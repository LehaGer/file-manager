import {access, constants, readFile} from "node:fs/promises";
import * as path from "node:path";
import {createHash} from "node:crypto";
import {INVALID_INPUT_ERROR_MSG, OPERATION_FAILED_ERROR_MSG} from "../constants.js";
import Mwd from "./mwd.js";

class Hash {

    static isCorrectFormat = async (input) => {

        if (input.length !== 2) return false;

        try {

            const inputArg = input.filter((val, index) => index !== 0).join(" ");

            await access(path.resolve(Mwd.getCurrentDir(), `${inputArg}`), constants.F_OK);

            return true;

        } catch (error) {

            return false;

        }
    };

    static checkInputFormat = async (input) => {

        if (!await this.isCorrectFormat(input)) {

            throw new Error(INVALID_INPUT_ERROR_MSG);

        }

    };

    static perform = async (input) => {

        input = input.trim().split(" ");

        await this.checkInputFormat(input);

        try {

            const inputArg = input.filter((val, index) => index !== 0).join(" ");
            const file = await readFile(path.resolve(Mwd.getCurrentDir(), `${inputArg}`));

            const hash = createHash("sha256");

            hash.update(file);

            const hashInHexFormat = hash.digest("hex");

            console.log(hashInHexFormat);

        } catch (e) {

            throw new Error(OPERATION_FAILED_ERROR_MSG);

        }

    };

}

export default Hash;