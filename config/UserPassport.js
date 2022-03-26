const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('dotenv').config();

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')||Headers.authorisation;
    opts.secretOrKey = env.SECRET||"verysecret";
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("--------- inside use passport ---------------")

        console.log(jwt_payload)
        User.getUserById(jwt_payload.user._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

