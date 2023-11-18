const { spawn } = require('child_process');
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post('/getEmotions', async (req, res) => {
    try {
        const lyrics = req.body.lyrics;
        const pythonProcess = spawn('python', ['./get_emotions.py', ...lyrics]);

        pythonProcess.stdout.on('data', (data) => {
            res.send(JSON.parse(data.toString().replace(/'/g, '"')));
        });

        pythonProcess.stderr.on('data', (data) => {
            res.status(500).send(data.toString());
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Server Error');
    }
});