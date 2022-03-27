const User = require('../models/users');
const Appartement = require('../models/appartement');
const Residence = require('../models/residence');
const PDFEmployee = require('../pdf/employee');
exports.generateInvoice = (req, res) => {
    var today = new Date();
    let unique_number = today.getTime();

    //find user
    User.findById({
        _id: req.params.id
    }, (err, user) => {
        if (err) return res.status(401).json({
            msg: err
        })
        else {
            let userr = user;
            fileName = 'attestation' + '-' + unique_number + '-' + user._id + '.pdf';
            PDFEmployee.create(user, fileName);
            userr.invoices.push(fileName);
            User.findByIdAndUpdate(req.params.id, userr, (err, user) => {
                if (err) return res.status(401).json({
                    msg: err
                })
                else {
                    return res.status(200).json({
                        msg: 'Invoice generated successfully',
                        resident: user
                    })
                }
            })
        }
    })

}
exports.activeResident = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            status: 'active',
            residence: req.body.residence
        }
    }, (err, user) => {
        if (err) return res.status(401).json({
            msg: err
        })
        else return res.status(200).json({
            msg: 'Resident activated successfully',
            resident: user
        })
    })
}
exports.getInactiveResident = (req, res) => {
    User.find({
        status: 'inactive'
    }, (err, user) => {
        if (err) return res.status(401).json({
            msg: err
        })
        else return res.status(200).json({
            msg: 'Resident inactive',
            resident: user
        })
    })
}
exports.deleteResident = (req, res) => {

    //delete resident from Appartement 
    Appartement.findOneAndUpdate({
        owners: req.params.id
    }, {
        $pull: {
            owners: req.params.id
        }
    }, (err, appartement) => {
        if (err) return res.status(401).json({
            msg: err
        })
        else {
            //delete resident from Residence
            Residence.findOneAndUpdate({
                syndic: req.params.id
            }, {
                $pull: {
                    syndic: req.params.id
                }
            }, (err, residence) => {
                if (err) return res.status(401).json({
                    msg: err
                })
                else {
                    //delete resident from User
                    User.findByIdAndRemove(req.params.id, (err, user) => {
                        if (err) return res.status(401).json({
                            msg: err
                        
                        })
                    })
                }
            })
        }
    })

    User.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) return res.status(401).json({
            msg: err
        })
        else return res.status(200).json({
            msg: 'Resident deleted successfully',
            resident: user
        })
    })
}
exports.getMyNeighbors = (req, res) => {
    User.find({
        residence: req.user.residence
    }, (err, user) => {
        if (err) return res.status(401).json({
            msg: err
        })
        else return res.status(200).json({
            msg: 'Neighbors',
            resident: user
        })
    })
}

