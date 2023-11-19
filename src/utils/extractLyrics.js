const cheerio = require('cheerio');

/**
 * Extracts lyrics from a given URL.
 * @param {string} url - The URL of the webpage containing the lyrics.
 * @returns {Promise<string|null>} - A promise that resolves to the extracted lyrics as a string, or null if no lyrics are found.
 * @throws {Error} - If an error occurs during the extraction process.
 */
module.exports = extractLyrics = async (url) => {
	try {
		const response = await fetch('http://localhost:3001/getLyrics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		};

		const lyrics = await response.text();
		if (!lyrics) return null;
		return lyrics;

	} catch (e) {
		throw e;
	};
};
