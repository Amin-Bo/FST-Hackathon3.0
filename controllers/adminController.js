const User = require('../models/users');
const Appartement = require('../models/appartement');
const Residence = require('../models/residence');
exports.addResidence = (req, res, next) => {
    const residence = new Residence({
        lable: req.body.lable,
        adresse: req.body.adresse,
        owner: req.body.owner,
        syndic: req.body.owner,
        NApprtement: req.body.NApprtement,
        })
    residence.save((err, residence) => {
        if (err) return res.status(401).json({ msg: err})
        else return res.status(200).json({ residence })
    })
}
exports.addSyndicToResidence = (req, res, next) => {
    Residence.findByIdAndUpdate(req.params.id, { $push: { syndic: req.body.syndic } }, (err, residence) => {
        if (err) return res.status(401).json({ msg: err })
        else return res.status(200).json({ residence })
    })
}
exports.getAllResidence = (req, res) => {
    Residence.find({}, (err, residences) => {
        if (err) return res.status(401).json({ msg: err })
        else return res.status(200).json({ residences })
    }).populate('owner')
}
exports.getResidentById = (req, res) => {
    Residence.findById(req.params.id, (err, residence) => {
        if (err) return res.status(401).json({ msg: err })
        else return res.status(200).json(residence)
    }).populate('owner')
}