import('load-json-file').then(async ({ loadJsonFile }) => {
    const file = await loadJsonFile('./src/data.json');
    console.log(file.filter(row => row.emotions.anger > 60));
}).catch(err => console.error(err));