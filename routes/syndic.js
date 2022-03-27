const express = require('express');
const router = express.Router();
const passport = require('passport');
const SyndicController = require('../controllers/syndicController');
router.post('/addInvoice/:id',SyndicController.generateInvoice)
router.post('/confirmResident/:id',SyndicController.activeResident)
router.get('/inactiveResidents',SyndicController.getInactiveResident)
router.post('/deleteResident/:id',SyndicController.deleteResident)
module.exports =router;