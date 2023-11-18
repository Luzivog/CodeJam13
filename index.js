const config = require('./src/config');
const getEmotionsFromQuery = require('./src/utils/getEmotionsFromQuery');
const searchSong = require('./src/utils/searchSong');

(async () => {
    const infos = await searchSong("blinding lights", config.API_KEY);
    const emotions = await getEmotionsFromQuery(infos.lyrics);
    for (const emotion in emotions) {
        emotions[emotion] = Math.round(emotions[emotion] * 10000)/100;
    }
    console.log(emotions);
})();

