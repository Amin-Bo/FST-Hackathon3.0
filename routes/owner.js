const express = require('express');
const router = express.Router();
const passport = require('passport');
const OwnerController = require('../controllers/ownerController')
router.post('/addResidence', passport.authenticate('jwt', {session: false}) ,OwnerController.AddResidence)
router.get('/myResidence', passport.authenticate('jwt', {session: false}),OwnerController.getMyresidence)

module.exports =router;