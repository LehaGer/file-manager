import {
    COMPRESS_COMMANDS,
    FILES_COMMANDS,
    HASH_COMMANDS,
    INVALID_INPUT_ERROR_MSG,
    MWD_COMMANDS,
    OS_COMMANDS,
} from "../constants.js";
import Mwd from "./mwd.js";
import File from "./file.js";
import Os from "./os.js";
import Hash from "./hash.js";
import Compress from "./compress.js";

class TaskController {

    static perform = async (input) => {

        try {

            if (MWD_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) await Mwd.perform(input);
            else if (FILES_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) await File.perform(input);
            else if (OS_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) await Os.perform(input);
            else if (HASH_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) await Hash.perform(input);
            else if (COMPRESS_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) await Compress.perform(input);
            else throw new Error(INVALID_INPUT_ERROR_MSG);

        } catch (error) {

            console.log(error.message);

        }

    };

}

export default TaskController;