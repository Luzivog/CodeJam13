const { spawn } = require('child_process');
const express = require('express');
const cheerio = require('cheerio');

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const extractLyrics = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.text();
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

        lyrics = lyrics.replace(/\d/g, '');
        lyrics = lyrics.replace(/[\[(][^\])]*[\])]/g, '');
        lyrics = lyrics.replace(/^\s*[\r\n]/gm, '');
        lyrics = lyrics.replace(/[^\w\s]/g, '');
        lyrics = lyrics.replace(/^\s+|\s+$/gm, '');
        lyrics = lyrics.toLowerCase().trim().split('\n');
        return lyrics;

    } catch (e) {
        throw e;
    };
};
app.post('/getEmotions', async (req, res) => {
    try {
        const lyrics = req.body.lyrics;
        const pythonProcess = spawn('python', ['./get_emotions.py', ...JSON.parse(lyrics).lyrics]);

        pythonProcess.stdout.on('data', (data) => {
            emotions = JSON.parse(data.toString().replace(/'/g, '"'));
            for (const emotion in emotions) {
                emotions[emotion] = Math.round(emotions[emotion]*10000)/100;
            }
            res.json(emotions);
        });

        pythonProcess.stderr.on('data', (data) => {
            res.status(500).send(data.toString());
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Server Error');
    }
});

app.post('/getLyrics', async (req, res) => {
    try {
        const url = req.body.url;
        const lyrics = await extractLyrics(url);
        if (lyrics === null) {
            res.status(404).send('No lyrics found');
        } else {
            res.json({ lyrics });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});