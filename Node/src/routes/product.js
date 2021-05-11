const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.get('/api/product/get', (req, res) => {
  mysqlConnection.query('SELECT * FROM product where product_cantidad > 0', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.get('/api/product/get/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM product WHERE product_id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

router.get('/api/product/category/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM product WHERE category_id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;
