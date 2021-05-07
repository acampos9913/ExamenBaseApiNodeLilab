const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.post('/api/purchase/', (req, res) => {
  const {Producto_id, Producto_cantidad} = req.body;
  
  mysqlConnection.query('SELECT product_cantidad FROM product WHERE product_id = ?', [Producto_id], (err, rows, fields) => {
    if (!err) {
      if (rows[0].product_cantidad < 1 ){
        existe = 0;
        res.json({status: 'No existe stock'});
      }
      else{
        update(Producto_id, Producto_cantidad, res);
      }
    } else {
      console.log(err);
    }
  });
});

function update(Producto_id, Producto_cantidad, res){
  console.log(Producto_cantidad)
  mysqlConnection.query('Update product set product_cantidad = (product_cantidad - ?) WHERE product_id = ?', [Producto_cantidad, Producto_id], (err, rows, fields) => {
    if (!err) {
        res.json({status: 'Compra Realizada'});
    } else {
      console.log(err);
    }
  });
}

module.exports = router;
