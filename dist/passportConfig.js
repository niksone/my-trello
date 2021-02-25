"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("./User"));
var bcrypt = require('bcryptjs');
var localStrategy = require('passport-local').Strategy;
module.exports = function (passport) {
    var authenticateUser = function (email, password, done) {
        User_1.default.findOne({ email: email }, function (err, user) {
            console.log('user-------------------');
            console.log(user);
            if (err)
                done(err);
            if (!user)
                return done(null, false, { message: 'wrong values' });
            bcrypt.compare(password, user.password, function (err, result) {
                if (err)
                    done(err);
                // result ? done(null, user) : done(null, false)
                console.log(result);
                if (result) {
                    return done(null, user);
                }
                else {
                    done(null, false);
                }
            });
        });
    };
    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(function (id, cb) {
        console.log(id);
        User_1.default.findById(id, function (err, user) {
            cb(err, user);
        });
    });
};
//# sourceMappingURL=passportConfig.js.map