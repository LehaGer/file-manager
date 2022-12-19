import {access, constants, rename as renameCommand, rm, writeFile} from "node:fs/promises";
import {createReadStream, createWriteStream} from "node:fs";
import * as path from "node:path";
import {Buffer} from "node:buffer";
import {INVALID_INPUT_ERROR_MSG, OPERATION_FAILED_ERROR_MSG} from "../constants.js";
import Mwd from "./mwd.js";

class File {

    static isCorrectFormat = async (input) => {

        switch (input[0]) {

            case "cat": {

                if (input.length < 2) return false;

                try {

                    const inputArg = input.filter((val, index) => index !== 0).join(" ");

                    await access(path.resolve(Mwd.getCurrentDir(), `${inputArg}`), constants.F_OK);

                    return true;

                } catch (error) {

                    return false;

                }

            }
            case "add": {

                if (input.length < 2) return false;

                try {

                    await access(path.resolve(Mwd.getCurrentDir()), constants.F_OK);

                    return true;

                } catch (error) {

                    return false;

                }

            }
            case "rn": {

                if (input.length !== 3) return false;

                try {

                    const initPath = path.resolve(Mwd.getCurrentDir(), input[1]);
                    const targetPath = path.resolve(Mwd.getCurrentDir(), input[2]);

                    await access(path.resolve(Mwd.getCurrentDir(), initPath), constants.F_OK);

                    try {

                        await access(path.resolve(Mwd.getCurrentDir(), targetPath), constants.F_OK);

                        return false;

                    } catch (error) {

                        return true;

                    }

                } catch (error) {

                    return false;

                }
            }
            case "cp": {

                if (input.length !== 3) return false;

                try {

                    const pathToFile = path.resolve(Mwd.getCurrentDir(), input[1]);
                    const pathToNewDir = path.resolve(Mwd.getCurrentDir(), input[2]);
                    const pathToNewFile = path.resolve(pathToNewDir, input[1]);

                    await access(pathToFile, constants.F_OK);
                    await access(pathToNewDir, constants.F_OK);

                    try {

                        await access(pathToNewFile, constants.F_OK);

                        return false;

                    } catch (error) {

                        return true;

                    }

                } catch (error) {

                    return false;

                }

            }
            case "mv": {

                if (input.length !== 3) return false;

                try {

                    const pathToFile = path.resolve(Mwd.getCurrentDir(), input[1]);
                    const pathToNewDir = path.resolve(Mwd.getCurrentDir(), input[2]);
                    const pathToNewFile = path.resolve(pathToNewDir, input[1]);

                    await access(pathToFile, constants.F_OK);
                    await access(pathToNewDir, constants.F_OK);

                    try {

                        await access(pathToNewFile, constants.F_OK);

                        return false;

                    } catch (error) {

                        return true;

                    }

                } catch (error) {

                    return false;

                }

            }
            case "rm": {

                if (input.length < 2) return false;

                try {

                    const inputArg = input.filter((val, index) => index !== 0).join(" ");
                    const pathToFile = path.resolve(Mwd.getCurrentDir(), inputArg);

                    await access(pathToFile, constants.F_OK);

                    return true;

                } catch (error) {

                    return false;

                }

            }
            default: {

                return false;

            }

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

            switch (input[0]) {

                case "cat": {

                    const inputArg = input.filter((val, index) => index !== 0).join(" ");
                    const filePath = path.resolve(Mwd.getCurrentDir(), `${inputArg}`);
                    const readableStream = createReadStream(filePath);

                    return new Promise(res => {

                        readableStream.on("data", (chunk) => {

                            console.log(chunk.toString());

                        });

                        readableStream.on("end", res);

                    });

                }
                case "add": {

                    const inputArg = input.filter((val, index) => index !== 0).join(" ");

                    const data = new Uint8Array(Buffer.from(""));
                    await writeFile(path.resolve(Mwd.getCurrentDir(), `${inputArg}`), data);

                    break;

                }
                case "rn": {

                    const initPath = path.resolve(Mwd.getCurrentDir(), input[1]);
                    const targetPath = path.resolve(Mwd.getCurrentDir(), input[2]);

                    await renameCommand(initPath, targetPath);

                    break;

                }
                case "cp": {

                    const pathToFile = path.resolve(Mwd.getCurrentDir(), input[1]);
                    const pathToNewDir = path.resolve(Mwd.getCurrentDir(), input[2]);
                    const pathToNewFile = path.resolve(pathToNewDir, input[1]);

                    const readableStream = createReadStream(pathToFile);
                    const writableStream = createWriteStream(pathToNewFile);

                    readableStream.pipe(writableStream);

                    break;

                }
                case "mv": {

                    const pathToFile = path.resolve(Mwd.getCurrentDir(), input[1]);
                    const pathToNewDir = path.resolve(Mwd.getCurrentDir(), input[2]);
                    const pathToNewFile = path.resolve(pathToNewDir, input[1]);

                    const readableStream = createReadStream(pathToFile);
                    const writableStream = createWriteStream(pathToNewFile);

                    readableStream.pipe(writableStream);

                    readableStream.on("end", async () => {

                        await rm(pathToFile);

                    });

                    break;

                }
                case "rm": {

                    const inputArg = input.filter((val, index) => index !== 0).join(" ");
                    const pathToFile = path.resolve(Mwd.getCurrentDir(), inputArg);

                    await rm(pathToFile);

                    break;

                }

            }

        } catch (e) {

            throw new Error(OPERATION_FAILED_ERROR_MSG);

        }

    };

}

export default File;