"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var dotenv = require('dotenv');
var passportConfig = require('./passportConfig');
var MongoStore = require('connect-mongo').default;
var User_1 = __importDefault(require("./User"));
var PORT = process.env.PORT || 5000;
var app = express();
var whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://wizardly-roentgen-09e599.netlify.app',
    'https://nikita-trello.herokuapp.com'
];
var link = 'mongodb+srv://niksone-ts:test1234@cluster0.cr0ko.mongodb.net/my-trello?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || link, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('connect to mongodb');
});
app.use(cors({ origin: whitelist, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 24 * 60 * 60,
    store: MongoStore.create({ mongoUrl: link })
}));
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
// require('./passportConfig.ts')(passport)
// Passport
// Routes
app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err)
            next(err);
        !user
            ? res.send('No user')
            : req.logIn(user, function (err) {
                if (err)
                    next(err);
                res.send(user);
            });
    })(req, res, next);
});
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password;
    return __generator(this, function (_b) {
        _a = req === null || req === void 0 ? void 0 : req.body, email = _a.email, password = _a.password;
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            res.send('Wrong values');
            return [2 /*return*/];
        }
        User_1.default.findOne({ email: email }, function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
            var hashedPassword, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err)
                            throw err;
                        if (user)
                            res.send('User already exist');
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        newUser = new User_1.default({
                            email: email,
                            password: hashedPassword
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _a.sent();
                        res.send(newUser);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
app.get('/user', function (req, res) {
    console.log(req.user, '=/user');
    res.send(req.session);
});
// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log('------------', req.user)
//     next()
// })
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('../../client/build/'))
// }
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('../../client/build')  
// })
app.listen(PORT, function () { return console.log("app is running on " + PORT); });
//# sourceMappingURL=index.js.map