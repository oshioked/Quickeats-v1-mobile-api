const express = require('express');
const router = express.Router();
const headerData = require('../data/header.data')

router.get('/header', (req, res) =>{
    res.json(headerData)
});

module.exports = router;