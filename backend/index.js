//require modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const passport = require("passport");

//use modules
dotenv.config();
app.use(require('cookie-parser')());

app.use(cors({origin: '*'}));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var user_cache = {};

passport.serializeUser(function(user, next) {
	console.log(user);
  let id = user._id;
  user_cache[id] = user;
  next(null, id);
});

passport.deserializeUser(function(id, next) {
  next(null, user_cache[id]);
});

//connect to db
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.once('open', () => console.log("Connected to mongo database"));
db.on('error', console.error.bind(console, "MongoDB connection error: "));


//routes

//Routers
const userRouter = require('./routes/userRouter');

//middleware
// const authMiddleware = require("./middleware/authMiddleware");

//Routes
app.use('/api', userRouter);
app.use('/api/privacy', (req, res) => res.send("cool p"));
app.use('/api/terms', (req, res) => res.send("cool v"));

//open web server
const PORT = process.env.PORT;
app.listen(PORT, function() {
    console.log("Server is running on @: " + "http://localhost:" + PORT);
});
