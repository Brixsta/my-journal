const { Pool } = require('pg');

const pool = new Pool({
    database: 'my-journal',
    port:5432
});

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });


module.exports = pool