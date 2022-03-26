const User = require('../models/users');
const multer = require('multer');
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
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});
exports.getResidents =  (req, res, next) => {
    User.find({type: 'resident'}, (err, resident)=>{
        if (err) return res.status(401).json({msg:'no resident yet'})
        else return res.status(200).json({resident})
    })
}

exports.getResidentById = (req, res, next) => {
    User.findById(req.params.id, (err, resident)=>{
        if (err) return res.status(401).json({msg:'no resident found'})
        else return res.status(200).json(resident)
    })
}

exports.updateResidentProfile = multer({storage:storageUser}).single("user_img") ,   (req, res, next) => {
    console.log(req.body)
    // User.findByIdAndUpdate(req.params.id, req.body, (err, employee)=>{
    //     if (err) return res.status(401).json({update : false})
    //     else return res.status(200).json({updated : true})
    // })
}