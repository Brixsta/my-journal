const { Pool } = require('pg');

const pool = new Pool({
    database: 'my-journal',
    port:5432
});


module.exports = pool