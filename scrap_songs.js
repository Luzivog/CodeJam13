const fs = require('fs');
const csv = require('csv-parser');
const getEmotionsFromQuery = require('./utils/getEmotionsFromQuery');
const searchSong = require('./utils/searchSong');

const readCSV = async (path) => {
    return await new Promise((resolve, reject) => {
        let results = []
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
        }); 
    });
};

import('load-json-file').then(async ({ loadJsonFile }) => {
    file = await readCSV('./MultiLabel.csv');
    save_path = './data.json';
    saved_data = await loadJsonFile(save_path);
    saved_data_set = new Set(saved_data.map(row => row.title));

    for (const row of file) {
        const infos = await searchSong(row.title, process.env.API_KEY);
        if (saved_data_set.has(infos.title)) {
            console.log(infos.title + " already in data.json")
            continue
        };

        const emotions = await getEmotionsFromQuery(infos.lyrics);
        for (const emotion in emotions) emotions[emotion] = Math.round(emotions[emotion] * 10000)/100;
        infos.emotions = emotions;
        delete infos.lyrics;

        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) return console.error(err);
            let jsonData = JSON.parse(data);
            jsonData.push(infos);
            console.log(jsonData)
            const jsonString = JSON.stringify(jsonData, null, 2);
            fs.writeFile('data.json', jsonString, 'utf8', (err) => {
                if (err) return console.error(err);
                console.log('File successfully updated');
            });
        });

        saved_data_set.add(infos.title);
    };
}).catch(err => console.error(err));

