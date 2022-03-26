const User = require('../models/users');
const Appartement = require('../models/appartement');
exports.getAppartements = (req, res, next) => {
    Appartement.find({}, (err, appartements)=>{
        if (err) return res.status(401).json({msg:'no appartements yet'})
        else return res.status(200).json({appartements})
    })
}
exports.getAppartementByOwner = (req, res, next) =>{
    Appartement.find({owners: req.params._id}, (err, appartements)=>{
        if (err) return res.status(401).json({msg:'no appartements yet'})
        else return res.status(200).json({appartements})
    })
}
exports.addAppartement = (req, res, next) =>{
    const appartement = new Appartement({
        lable: req.body.lable,
        type: req.body.type,
        disponibility: req.body.disponibility,
        department: req.body.department,
        status: req.body.status
    })
    appartement.save((err, appartement)=>{
        if (err) return res.status(401).json({msg:'no appartements yet'})
        else return res.status(200).json({appartement})
    })
}
exports.asignUserToAppartement = (req, res, next) =>{
    Appartement.findByIdAndUpdate(req.params.id, {$push: {owners: req.body.user_id}}, (err, appartement)=>{
        if (err) return res.status(401).json({msg:'no appartements yet'})
        else return res.status(200).json({appartement})
    })
}
exports.getAppartementById = (req, res, next) =>{
    Appartement.findById(req.params.id, (err, appartement)=>{
        if (err) return res.status(401).json({msg:'no appartements yet'})
        else return res.status(200).json(appartement)
    }).populate('owners')
}