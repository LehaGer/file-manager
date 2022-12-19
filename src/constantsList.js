import * as os from 'node:os';

export const INVALID_INPUT_ERROR_MSG = "Invalid input";
export const OPERATION_FAILED_ERROR_MSG = "Operation failed";
export const HOME_DIR = os.homedir();
export const MWD_COMMANDS = [
    "up",
    "cd",
    "ls",
];
export const FILES_COMMANDS = [
    "cat",
    "add",
    "rn",
    "cp",
    "mv",
    "rm",
];
export const OS_COMMANDS = [
    "os",
];
export const HASH_COMMANDS = [
    "hash",
];
export const COMPRESS_COMMANDS = [
    "compress",
    "decompress",
];