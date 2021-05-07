const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/api/product/', (req, res) => {
  mysqlConnection.query('SELECT * FROM product', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/api/product/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM product WHERE product_id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

router.get('/api/category/product/:id', (req, res) => {
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
