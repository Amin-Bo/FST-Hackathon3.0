const moment = require('moment');
const path = require('path');
const pdfTemplates = require('./templates');

exports.create = (user, fileName, res) =>{
  console.log(user.body)
    firstName = user.firstName || '##First Name##';
    lastName = user.lastName || '##Last Name##';
    cin = user.cin || '##CIN##';   
    saveToPath = "../assets/invoices/";
    //delete file if exist
    try{
        var pdfFile = path.join(__dirname, saveToPath+fileName);
          pdfTemplates.workTemplate(firstName,lastName,cin,pdfFile);
      }catch(err){
        console.error('MakePDF ERROR: ' + err.message);
      }
}
