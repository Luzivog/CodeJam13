const axios = require('axios');
const cheerio = require('cheerio-without-node-native');

/**
 * Extracts lyrics from a given URL.
 * @param {string} url - The URL of the webpage containing the lyrics.
 * @returns {Promise<string|null>} - A promise that resolves to the extracted lyrics as a string, or null if no lyrics are found.
 * @throws {Error} - If an error occurs during the extraction process.
 */
const extractLyrics = async (url) => {
    try {
		let { data } = await axios.get(url);
		const $ = cheerio.load(data);
		let lyrics = $('div[class="lyrics"]').text().trim();
		if (!lyrics) {
			lyrics = '';
			$('div[class^="Lyrics__Container"]').each((i, elem) => {
				if ($(elem).text().length !== 0) {
					let snippet = $(elem)
						.html()
						.replace(/<br>/g, '\n')
						.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
					lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
				}
			});
		}
		if (!lyrics) return null;
		return lyrics.trim();
	} catch (e) {
		throw e;
	}
}

module.exports = extractLyrics;