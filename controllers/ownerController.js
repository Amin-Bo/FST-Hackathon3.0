const User = require('../models/users');
const Appartement = require('../models/appartement');
const Residence = require('../models/residence');
exports.AddResidence = (req, res) => {
    const residence = new Residence({
        lable: req.body.lable,
        adresse: req.body.adresse,
        syndic: req.user._id,
        NApprtement: req.body.NApprtement
    })
    residence.save((err, residence) => {
        if (err) return res.status(401).json({ msg: err })
        else return res.status(200).json({ residence })
    })
}

exports.getMyresidence = (req, res) => {
    Residence.find({ owner: req.user._id }, (err, residence) => {
        if (err) return res.status(401).json({ msg: err })
        else return res.status(200).json({ residence })
    })
}