const express = require("express");
const pool = require("./queries.js");
const route = express.Router();

route.get("/actor", (req, res) => {
  pool.query("SELECT * FROM actor ORDER BY actor_id", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam permintaan database" });
      return;
    }
    res.status(200).json(result.rows);
  });
});
route.get("/actor/:first_name", (req, res) => {
  const firstName = req.params.first_name;
  pool.query(
    "SELECT * FROM actor WHERE LOWER(first_name) = LOWER($1) ORDER BY actor_id",
    [firstName],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam permintaan database" });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
});

route.get("/film", (req, res) => {
  pool.query("SELECT * FROM film ORDER BY film_id", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam permintaan database" });
      return;
    }
    res.status(200).json(result.rows);
  });
});

route.get("/film-category", (req, res) => {
  pool.query("SELECT * FROM film_category ", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam permintaan database" });
      return;
    }
    res.status(200).json(result.rows);
  });
});
route.get("/category", (req, res) => {
  pool.query("SELECT * FROM category ORDER BY category_id", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam permintaan database" });
      return;
    }
    res.status(200).json(result.rows);
  });
});

route.get("/film/:id", (req, res) => {
  const filmId = req.params.id;
  pool.query(
    "SELECT * FROM film WHERE film_id = $1",
    [filmId],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam permintaan database" });
        return;
      }
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Film tidak ditemukan" });
        return;
      }
      res.status(200).json(result.rows[0]);
    }
  );
});

route.get("/film-by-category/:nama_kategori", (req, res) => {
  const namaKategori = req.params.nama_kategori;
  pool.query(
    `SELECT film.film_id, film.title, film.description
      FROM film
      INNER JOIN film_category ON film.film_id = film_category.film_id
      INNER JOIN category ON film_category.category_id = category.category_id
      WHERE LOWER(category.name) = LOWER($1)`,
    [namaKategori],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan dalam permintaan database" });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
});

module.exports = route;
