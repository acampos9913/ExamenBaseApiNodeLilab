const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.get('/api/category/get', (req, res) => {
  mysqlConnection.query('SELECT * FROM category', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
