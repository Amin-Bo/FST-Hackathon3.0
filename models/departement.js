const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema Definition
//TODO: Assignment: Add Validate rule for email to be unique

const DepartementSchema = mongoose.Schema({
    lable: {
        type: String
    },
    syndic: {
        type: Schema.Types.ObjectId
    },  
     
});
const Departement = mongoose.model("Departement", DepartementSchema);

module.exports = Departement;