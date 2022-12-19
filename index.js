import process from 'node:process';

const fileManager = () => {

    try {

        const username = process.argv[2].startsWith("--")
            ? process.argv[2].split("=")[1]
            : "";

        console.log(`Welcome to the File Manager, ${username}!`);

    } catch (error) {

        throw error;

    }

}

fileManager();