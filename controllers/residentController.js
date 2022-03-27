const User = require('../models/users');
const Reclamation = require('../models/reclamation');
const multer = require('multer');
const PDFInvoice = require('../pdf/pdfInvoice');
const path = require('path');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storageReclamation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/reclamation/'));
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
exports.addReclamation = (req, res, next) => {
    const reclamation = new Reclamation({
        sender:req.user._id,
        description: req.body.description,
        pics: req.body.pics,
        priority: req.body.priority
    });
    reclamation.save((err, reclamation)=>{
        if (err) return res.status(401).json({msg:'error'})
        else return res.status(200).json(reclamation)
    })
}
exports.cancelReclamation = (req, res, next) => {
    Reclamation.findByIdAndDelete(req.params.id, (err, reclamation)=>{
        if (err) return res.status(401).json({msg:'error'})
        else return res.status(200).json(reclamation)
    })
}
exports.getReclamationById = (req, res, next) => {
    Reclamation.findById(req.params.id, (err, reclamation)=>{
        if (err) return res.status(401).json({msg:'error'})
        else return res.status(200).json(reclamation)
    })
}
exports.getMyReclamations = (req, res, next) => {
    Reclamation.find({sender: req.user._id}, (err, reclamation)=>{
        if (err) return res.status(401).json({msg:'error'})
        else return res.status(200).json(reclamation)
    })
}
exports.getReclamations = (req, res, next) => {
    Reclamation.find({}, (err, reclamation)=>{
        if (err) return res.status(401).json({msg:'error'})
        else return res.status(200).json(reclamation)
    })
}

exports.preview = (req, res, next) => {
    // console.log(req.body);
    PDFInvoice.create(req);
    return res.status(200).json(req.body.file)
}

exports.getMyNeighbors = (req, res, next) => {
    User.find({type: 'resident', department: req.user.department}, (err, resident)=>{
        if (err) return res.status(401).json({msg:'no resident yet'})
        else return res.status(200).json({resident})
    })
}