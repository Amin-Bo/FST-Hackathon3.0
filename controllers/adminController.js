const User = require('../models/users');
const Appartement = require('../models/appartement');
const Residence = require('../models/residence');
exports.addResidence = (req, res, next) => {
    const residence = new Residence({
        lable: req.body.lable,
        adresse: req.body.adresse,
        syndic: req.body.syndic,
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