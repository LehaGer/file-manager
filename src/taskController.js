import {COMPRESS_COMMANDS, FILES_COMMANDS, HASH_COMMANDS, MWD_COMMANDS, OS_COMMANDS} from "./constantsList.js";
import Mwd from "./mwd.js";
import File from "./file.js";
import Os from "./os.js";
import Hash from "./hash.js";
import Compress from "./compress.js";

class TaskController {

    static perform = async (input) => {

        try {

            if (MWD_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) await Mwd.perform(input);
            if (FILES_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) File.perform(input);
            if (OS_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) Os.perform(input);
            if (HASH_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) Hash.perform(input);
            if (COMPRESS_COMMANDS.filter(availableInput => input.startsWith(availableInput)).length) Compress.perform(input);

        } catch (error) {

            console.log(error.message);

        }

    };

}

export default TaskController;