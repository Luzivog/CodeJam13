const searchSong = require('./utils/searchSong');
const { spawn } = require('child_process');
require('dotenv').config();

(async () => {
    const infos = await searchSong('you belong with me', process.env.API_KEY);
    console.log(infos.title);

    const pythonProcess = spawn('python', ['./get_emotions.py', ...infos.lyrics]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Emotions detected: `, JSON.parse(data.toString().replace(/'/g, '"')));
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });
})();

