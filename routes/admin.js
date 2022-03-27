const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
router.post('/addResidence',AdminController.addResidence)
router.post('/addSyndic/:id',AdminController.addSyndicToResidence)
router.get('/allResidence',AdminController.getAllResidence)
router.get('/residence/:id',AdminController.getResidentById)
module.exports =router;