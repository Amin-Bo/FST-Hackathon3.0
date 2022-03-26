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
            let userr=user;
            fileName = 'attestation' + '-' + unique_number + '-' + user._id + '.pdf';
            PDFEmployee.create(user, fileName);
            userr.invoices.push(fileName);
            User.findByIdAndUpdate(req.params.id, userr,(err,user)=>{
                if(err) return res.status(401).json({
                    msg: err
                })
                else{
                    return res.status(200).json({
                        msg: 'Invoice generated successfully',
                        resident: user
                    })
                }
            })
        }
    })

}