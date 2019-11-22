//require modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

//use modules
dotenv.config();
app.use(cors({origin: '*'}));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//connect to db
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.once('open', () => console.log("Connected to mongo database"));
db.on('error', console.error.bind(console, "MongoDB connection error: "));

//open web server
const PORT = process.env.PORT || 9001;
app.listen(PORT, function() {
    console.log("Server is running on @: " + "http://localhost:" + PORT);
});
