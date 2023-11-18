const ytdl = require('ytdl-core');
const searchSong = require('./searchSong');
const YouTube = require("youtube-sr").default;

const getInfosFromQuery = async (query, apiKey) => {

    const link = await new Promise(async (resolve) => {
        YouTube.search(query)
            .then(result => {
                resolve("https://www.youtube.com/watch?v=" + result[0].id);
            })
            .catch(err => resolve(null));
    });

    if (link === null) return null;

    const infos = await ytdl.getInfo(link)
        .then(res => {
            searchSong({
                query: res.videoDetails.title,
                apiKey: apiKey,
            })
                .then(res => {
                    console.log(res);
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    return null;
                });
        })
        .catch(err => {
            console.log(err);
            return null;
        });

    return infos;
};
module.exports = getInfosFromQuery;
