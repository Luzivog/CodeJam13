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
 * Searches for a song based on the provided query and API key.
 * @param {string} query - The search query for the song.
 * @param {string} apiKey - The API key for accessing the song search API.
 * @returns {Promise<Object|null>} - A promise that resolves to an object containing the song details (title, artist name, album art, lyrics) if a matching song is found. Returns null if no song is found.
 * @throws {Error} - If any error occurs during the search process.
 */
module.exports = searchSong = async (query, apiKey) => {
    try {
		checkOptions({query: query, apiKey: apiKey});
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
};