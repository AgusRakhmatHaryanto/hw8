const pool = require('../queries.js');
const fs = require('fs');

const seedQuery = fs.readFileSync('db/seeding.sql',{encoding: 'utf8'});
pool.query(seedQuery, (err, res)=>{
    console.log(err);
    console.log('Seeding Berhasil!');
    pool.end();
});