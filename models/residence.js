const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema Definition
//TODO: Assignment: Add Validate rule for email to be unique

const ResidenceSchema = mongoose.Schema({

    lable: {
        type: String
    },

    adresse: {
        type: String
    },
    owner: {
        type : Schema.Types.ObjectId, required: false,ref:"User"
    },
    syndic: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    NApprtement: {
        type: Number
    },
    pics: [{
        type: String,
    }],
    status: {
        type: String,
        default: "pending"
    },
    date_construction: {
        type: Date,
        default:  Date.now()
    },
    date: {
        type: Date,
        default:   Date.now,
    }
});
const Residence = mongoose.model("Residence", ResidenceSchema);
module.exports = Residence;