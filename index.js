const searchSong = require('./utils/searchSong');
require('dotenv').config();

(async () => {
    const infos = await searchSong('baby justin bieber', process.env.API_KEY);
    console.log(infos);
})();

