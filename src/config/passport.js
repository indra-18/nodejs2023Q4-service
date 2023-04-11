// require('dotenv').config()
// const jwtStrategy = require('passport-jwt').Strategy;
// const jwtExtract = require('passport-jwt').ExtractJwt;

// const options = {};
// const passport = require('passport');
// const UserModel = require('../models/user.model')

// module.exports = (passport) => {
//     options.jwtFromRequest = jwtExtract.fromAuthHeaderWithScheme("jwt");
//     options.secret = process.env.SECRET;
//     passport.use(new jwtStrategy(options, function(jwt_payload, done) {
//         UserModel.findOne({id: jwt_payload.id,}, function(err, user) {
//             if (err) return done(err, false);
//             if (user) return done(null, user);
//             else return done(null, false)
//         })
//     }))
// }