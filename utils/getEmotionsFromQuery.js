const searchSong = require('./searchSong');
const { spawn } = require('child_process');
require('dotenv').config('../.env');


/**
 * Analyzes the emotional content of a song's lyrics based on a given query.
 * Utilizes a Python script to perform the emotion analysis.
 * @async
 * @module getEmotionsFromQuery
 * @param {string} query - The search query to find a song.
 * @returns {Promise<Object>} A promise that resolves to an object containing the emotional analysis of the song's lyrics.
 * @throws {Error} Catches and logs any errors encountered during execution.
 */
module.exports = getEmotionsFromQuery = async (query) => {
    try {
        const infos = await searchSong(query, process.env.API_KEY);
        console.log(infos.title);
        const pythonProcess = spawn('python', ['./get_emotions.py', ...infos.lyrics]);
        const result = await new Promise((resolve, reject) => {
            pythonProcess.stdout.on('data', (data) => {
                resolve(JSON.parse(data.toString().replace(/'/g, '"')));
            });
            pythonProcess.stderr.on('data', (data) => {
                reject(data.toString());
            });
        });
        return result
    } catch (error) {
        console.error("Error:", error);
    };
};
