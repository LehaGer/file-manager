import {access, constants} from "node:fs/promises";
import * as path from "node:path";
import {INVALID_INPUT_ERROR_MSG, OPERATION_FAILED_ERROR_MSG} from "./constantsList.js";
import Mwd from "./mwd.js";
import {createReadStream, createWriteStream} from "node:fs";
import {createBrotliCompress, createBrotliDecompress} from "node:zlib";

class Compress {

    static isCorrectFormat = async (input) => {

        if (input.length !== 3) return false;

        try {

            await access(path.resolve(Mwd.getCurrentDir(), input[1]), constants.F_OK);

            try {

                await access(path.resolve(Mwd.getCurrentDir(), input[2]), constants.F_OK);

                return false;

            } catch (error) {

                return true;

            }

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

            if (input[0] === "compress") {

                const pathToInitFile = path.resolve(Mwd.getCurrentDir(), input[1]);
                const pathToDistFile = path.resolve(Mwd.getCurrentDir(), input[2]);

                const readStream = createReadStream(pathToInitFile);
                const writeStream = createWriteStream(pathToDistFile);

                const brotli = createBrotliCompress();

                const stream = readStream.pipe(brotli).pipe(writeStream);

                stream.on("finish", () => {

                    console.log("compression finished");

                });

            }

            if (input[0] === "decompress") {

                const pathToInitFile = path.resolve(Mwd.getCurrentDir(), input[1]);
                const pathToDistFile = path.resolve(Mwd.getCurrentDir(), input[2]);

                const readStream = createReadStream(pathToInitFile);
                const writeStream = createWriteStream(pathToDistFile);

                const brotli = createBrotliDecompress();

                const stream = readStream.pipe(brotli).pipe(writeStream);

                stream.on("finish", () => {

                    console.log("decompression finished");

                });

            }

        } catch (e) {

            throw new Error(OPERATION_FAILED_ERROR_MSG);

        }

    };

}

export default Compress;