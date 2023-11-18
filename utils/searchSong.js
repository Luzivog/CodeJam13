const axios = require('axios');
const extractLyrics = require('./extractLyrics');

const searchUrl = 'https://api.genius.com/search?q=';

const checkOptions = (options) => {
	let { apiKey, query } = options;
	if (!apiKey) {
		throw '"ApiKey" property is missing from options';
	} else if (!query) {
		throw '"Query" property is missing from options';
	};
};

const sanitizeQuery = (query) => {
	return query
		.toLowerCase()
		.replace(/ *\([^)]*\) */g, '')
		.replace(/ *\[[^\]]*]/, '')
		.replace(/feat.|ft./g, '')
		.replace(/\s+/g, ' ')
		.trim();
};


/**
 * @param {{apiKey: string, query: string}} options
 */

const searchSong = async (options) => {
    try {
		checkOptions(options);
		let { apiKey, query } = options;
		const song = sanitizeQuery(query);
		const reqUrl = `${searchUrl}${encodeURIComponent(song)}`;
		let { data } = await axios.get(`${reqUrl}&access_token=${apiKey}`);

		if (data.response.hits.length === 0) return null;

        const { full_title, song_art_image_url, url, artist_names } = data.response.hits[0].result;
        return { 
            title: full_title,
            artist_name: artist_names,
            albumArt: song_art_image_url, 
            lyrics: await extractLyrics(url)
        };

	} catch (e) {
		throw e;
	};
}


module.exports = searchSong;