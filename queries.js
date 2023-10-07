const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvdrental",
  password: "BROWN 100",
  port: 5432,
});
pool.connect((err, res) => {
  if (err) {
    console.error(err);
    console.log("Gagal terhubung ke database");
    return;
  }
  console.log("Connect Database");
});

module.exports = pool;
