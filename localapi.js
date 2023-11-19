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
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked'
        });

        pythonProcess.stdout.on('data', (data) => {
            const jsonstring = data.toString().replaceAll("'", '"');
            const emotions = JSON.parse(jsonstring.split('\n')[0]);

            // Convert emotions values to a scale of 1 to 100
            const emotions100 = {};
            for (const key in emotions) emotions100[key] = Math.round(emotions[key] * 10000)/100;
            res.write(JSON.stringify(emotions100) + "\n");
        });

        pythonProcess.stdout.on('end', () => {
            res.end();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Error:', data.toString());
            res.write(JSON.stringify({ error: data.toString() }) + "\n");
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`pythonProcess exited with code ${code}`);
                res.end('Server Error');
            }
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