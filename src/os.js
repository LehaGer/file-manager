import {arch, cpus, EOL, homedir, userInfo} from "node:os";
import {INVALID_INPUT_ERROR_MSG, OPERATION_FAILED_ERROR_MSG} from "./constantsList.js";

class Os {

    static isCorrectFormat = async (input) => {

        switch (input[1].replace("--", "")) {

            case "EOL": {

                return input.length === 2;

            }
            case "cpus": {

                return input.length === 2;

            }
            case "homedir": {

                return input.length === 2;
            }
            case "username": {

                return input.length === 2;

            }
            case "architecture": {

                return input.length === 2;

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

            switch (input[1].replace("--", "")) {

                case "EOL": {

                    console.log(EOL());

                    break;

                }
                case "cpus": {

                    console.log(cpus());

                    break;

                }
                case "homedir": {

                    console.log(homedir());

                    break;

                }
                case "username": {

                    console.log(userInfo().username);

                    break;

                }
                case "architecture": {

                    console.log(arch());

                    break;

                }

            }

        } catch (e) {

            throw new Error(OPERATION_FAILED_ERROR_MSG);

        }

    };

}

export default Os;