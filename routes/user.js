const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const User = require('../models/users');
const path = require('path');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/'));
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now() + '-' + name);
    }
});
///Controllers 
const AuthController = require('../controllers/authController');
const ResidentController = require('../controllers/residentController');
const { set } = require('../app');
//Login
router.post('/login', AuthController.login);
//Registration
router.post('/register', AuthController.register);
router.get('/allResident', ResidentController.getResidents);
router.get('/resident/:id', ResidentController.getResidentById);
router.post('/resident/update/:id', multer({
    storage: storageUser
}).single("user_img"), (req, res, next) => {
    req.body.user_img=req.file.filename;
     User.findByIdAndUpdate(req.params.id,req.body, (err, employee)=>{
         console.log(req.file.filename)
         if (err) return res.status(401).json({update : false})
         else return res.status(200).json({updated : true})
    })
});
module.exports = router;