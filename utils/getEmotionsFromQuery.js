const searchSong = require('./searchSong');
const { spawn } = require('child_process');
require('dotenv').config('../.env');

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
