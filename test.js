import('load-json-file').then(async ({ loadJsonFile }) => {
    const file = await loadJsonFile('./data.json');
    console.log(file.filter(row => row.emotions.joy > 40 && row.emotions.anger > 40));
}).catch(err => console.error(err));