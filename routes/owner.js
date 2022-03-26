const express = require('express');
const router = express.Router();
const passport = require('passport');
const OwnerController = require('../controllers/ownerController')
router.post('/addResidence', passport.authenticate('jwt', {session: false}) ,OwnerController.AddResidence)
module.exports =router;