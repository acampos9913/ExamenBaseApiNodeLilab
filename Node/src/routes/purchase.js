const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.post('/api/purchase/add', (req, res) => {
  const {pParametroJson} = req.body;
  mysqlConnection.query('call spJSon(?)', [JSON.stringify(pParametroJson)], (err, rows, fields) => {
    if (!err) {
        res.json({status: 'yes'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
