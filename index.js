const getEmotionsFromQuery = require('./utils/getEmotionsFromQuery');
require('dotenv').config();

(async () => {
    const emotions = await getEmotionsFromQuery("way up jayden smith");
    for (const emotion in emotions) {
        emotions[emotion] = Math.round(emotions[emotion] * 10000)/100;
    }
    console.log(emotions);
})();

