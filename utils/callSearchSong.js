const searchSong = require("./searchSong");
require('dotenv').config('../.env');

async function main() {
    try {
        const arg = process.argv[2];
        const result = await searchSong(arg, process.env.API_KEY);
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
};

main(); 