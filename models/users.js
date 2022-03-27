const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema Definition
//TODO: Assignment: Add Validate rule for email to be unique
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  cin: {
    type: String
  },
  date_in: {
    type: String
  },
  date_out: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  user_img: {
    type: String,
    default: ""
  },
  residence: {
    type: Schema.Types.ObjectId,
    ref: "Residence",
  },
  type: {
    type: String,
    enum: ["admin", "owner", "syndic", "resident"],
    required: true,
    default: "resident",
  },
  invoices: [{
    type: String
  }],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  }
});

//Pre Save Hook. Used to hash the password
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  //Generate Salt Value
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    //Use this salt value to hash password
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

//Custom method to check the password correct when login
UserSchema.methods.isPasswordMatch = function (
  plainPassword,
  hashed,
  callback
) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;