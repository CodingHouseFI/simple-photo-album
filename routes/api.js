'use strict';

const express = require('express');

let router = express.Router();

router.use('/albums', require('./albums'));

module.exports = router;
