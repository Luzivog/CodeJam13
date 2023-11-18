const { spawn } = require('child_process');
require('dotenv').config('../.env');

module.exports = getEmotionsFromLyrics = async (lyrics) => {
    try {
        const pythonProcess = spawn('python', ['./get_emotions.py', ...lyrics]);
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
