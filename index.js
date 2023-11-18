const getInfosFromQuery = require('./utils/getInfosFromQuery');
require('dotenv').config();

(async () => {
    const infos = await getInfosFromQuery('bling lits', process.env.API_KEY);
})();

