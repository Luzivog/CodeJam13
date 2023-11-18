const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');
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

(async () => {
    file = await readCSV('./MultiLabel.csv');
    save_path = './data.csv';
    saved_data = await readCSV(save_path);
    saved_data_set = new Set(saved_data.map(row => row.title));
    for (const row of saved_data) row.emotions = JSON.parse(row.emotions);

    for (const row of file) {
        const infos = await searchSong(row.title, process.env.API_KEY);
        if (saved_data_set.has(infos.title)) {
            console.log(infos.title + " already in data.csv")
            continue
        };

        const emotions = await getEmotionsFromQuery(infos.lyrics);
        for (const emotion in emotions) emotions[emotion] = Math.round(emotions[emotion] * 10000)/100;
        infos.emotions = emotions;
        delete infos.lyrics;
        const fields = Object.keys(infos);
        let json2csvParser;

        if (fs.existsSync(save_path)) json2csvParser = new Parser({ fields, header: false });
        else json2csvParser = new Parser({ fields });

        const csv = json2csvParser.parse(infos) + "\n";
        fs.appendFile(save_path, csv, function(err) {
            if (err) return console.error(err);
        });

        saved_data_set.add(infos.title);
    };
})();