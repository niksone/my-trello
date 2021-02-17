import { UserI } from "./Interfaces/UserInterface"
import User from "./User"
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = (passport: any) => {
    const authenticateUser = (email: String, password: String, done: any) => {
        User.findOne({email: email}, (err: Error, user: UserI) => {
            console.log('user-------------------');
            console.log(user);
            if(err) done(err)
            if(!user) return done(null, false, {message: 'wrong values'})
            bcrypt.compare(password, user.password, (err: Error, result: Boolean) => {
                if(err) done(err);
                // result ? done(null, user) : done(null, false)
                console.log(result)
                if(result) {
                    return done(null, user)
                } else{
                    done(null, false)
                }
            })
        })
        
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user: any, cb: any) => {
        cb(null, user.id)
    })

    passport.deserializeUser((id: any, cb: any) => {
        console.log(id);
        User.findById(id, (err: Error, user: any) => {
            cb(err, user)
        })
    })
}

// const User = require("./User");
// const bcrypt = require("bcryptjs");
// const localStrategy = require("passport-local").Strategy;

// module.exports = function (passport) {
//     passport.use(
//         new localStrategy((email, password, done) => {
//             User.findOne({ email: email }, (err, user) => {
//                 if (err) throw err;
//                 if (!user) return done(null, false);
//                 return done(null, user)
//                 // bcrypt.compare(password, user.password, (err, result) => {
//                 //     if (err) throw err;
//                 //     if (result === true) {
//                 //         return done(null, user);
//                 //     } else {
//                 //         return done(null, false);
//                 //     }
//                 // });
//             });
//         })
//     );

//     passport.serializeUser((user, cb) => {
//         cb(null, user.id);
//     });
    
//     passport.deserializeUser((id, cb) => {
//         User.findOne({ _id: id }, (err, user) => {
//         cb(err, userInformation);
//         });
//     });
// };

