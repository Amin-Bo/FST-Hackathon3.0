const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema Definition
//TODO: Assignment: Add Validate rule for email to be unique

const ReclamationSchema = mongoose.Schema({

    description: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: " "
    },
    pics: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ["done","in-progress","canceled","pending"],
        default: "pending"
    },
    priority: {
        type:Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const Reclamation = mongoose.model("Reclamation", ReclamationSchema);
module.exports = Reclamation;