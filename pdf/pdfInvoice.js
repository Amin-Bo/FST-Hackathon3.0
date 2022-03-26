const moment = require('moment');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
const User = require('../models/users');
const path = require('path');
const pdfTemplates = require('./templates');


exports.create = (req) => {
    let olduser = new User()
    User.findOne({
        _id: req.body.user_id
    }, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        cin: req.body.cin
    }, (err, user) => {
        olduser = user;
    });

    firstName = req.body.firstName || '##First Name##';
    lastName = req.body.lastName || '##Last Name##';
    cin = req.body.cin || '##CIN##';
    date_in = moment(req.body.date_in).format('DD/MM/YYYY') || '##Date In##';
    saveToPath = "../assets/invoices/";

    try {
        var pdfFile = path.join(__dirname, saveToPath + req.body.file);
        pdfTemplates.workTemplate(olduser.firstName,olduser.lastName, olduser.cin, olduser.date_in, pdfFile);
    } catch (err) {
        console.error('MakePDF ERROR: ' + err.message);
    }
}