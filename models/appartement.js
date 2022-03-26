const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema Definition
//TODO: Assignment: Add Validate rule for email to be unique

const AppartementSchema = mongoose.Schema({
    lable: {
        type: String
    },
    departement: {
        type: Schema.Types.ObjectId,
        ref: "Departement"
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: String
    },
    reclamations: [{
        type: String
    }],
    disponibilté: {
        type: String,
        enum: ["Disponible", "Indisponible"]
    },
    type: {
        type: String,
    },
    photos: [{
        type: String,
    }]

});
const Appartement = mongoose.model("Appartement", AppartementSchema);

module.exports = Appartement;