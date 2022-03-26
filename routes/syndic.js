const express = require('express');
const router = express.Router();
const passport = require('passport');
const SyndicController = require('../controllers/syndicController');
router.post('/addInvoice/:id',SyndicController.generateInvoice)
module.exports =router;