const config = require('./src/config');
const getEmotionsFromQuery = require('./src/utils/getEmotionsFromQuery');
const searchSong = require('./src/utils/searchSong');

(async () => {
    const infos = await searchSong("stan", config.API_KEY);

    const response = await fetch('http://localhost:3001/getEmotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ lyrics: infos.lyrics })
      });

      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkAsString = new TextDecoder("utf-8").decode(value);
        const chunkAsJson = JSON.parse(chunkAsString);
        console.log(chunkAsJson)
        console.log('Current average:', chunkAsJson);
      };
      console.log('Done')
})();

