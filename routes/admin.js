const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
router.post('/addResidence',AdminController.addResidence)
router.post('/addSyndic/:id',AdminController.addSyndicToResidence)
module.exports =router;