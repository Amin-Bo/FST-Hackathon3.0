const express = require('express');
const router = express.Router();
const AppartementController=require('../controllers/appartementController')
router.get('/appartements',AppartementController.getAppartements)
router.get('/appartement/:id',AppartementController.getAppartementByOwner);
router.get('/appartementById/:id',AppartementController.getAppartementById);
router.post('/appartement/:id',AppartementController.asignUserToAppartement)
router.post('/addAppartement/',AppartementController.addAppartement)
module.exports =router;