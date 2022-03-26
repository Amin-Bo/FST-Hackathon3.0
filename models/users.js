const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema Definition
//TODO: Assignment: Add Validate rule for email to be unique

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
    default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Ftoppng.com%2Fuploads%2Fpreview%2Favatar-png-11554021661asazhxmdnu.png&imgrefurl=https%3A%2F%2Ftoppng.com%2Favatar-png-PNG-free-PNG-Images_140590&tbnid=WU9BX6TsFSCo3M&vet=12ahUKEwjGjZD-7uP2AhUWuKQKHaFkAIwQMygBegUIARDaAQ..i&docid=prAtw1vgwusTeM&w=840&h=859&q=avatar%20png&ved=2ahUKEwjGjZD-7uP2AhUWuKQKHaFkAIwQMygBegUIARDaAQ"
  },
  type: {
    type: String,
    enum: ["admin", "owner", "syndic", "resident"],
    required: true,
    default: "resident",
  },
  invoices: [{
    type: String
  }]
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