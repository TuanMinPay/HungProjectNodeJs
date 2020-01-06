'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto-js');
const path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://ds021884.mlab.com:21884/hungproject', {
    auth: {
        user: "admin",
        password: "admin123!@#"
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Database connect error!");
        return;
    }
    console.log('Database has connected successfully.');
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var authRoute = require('./routes/authRoute');
authRoute(app);
var profileRoute = require('./routes/profileRoute');
profileRoute(app);

app.get('/', (req, res) => res.send('Hello world!'));
app.listen(8080, function () {
    console.log('Port 8080: cứ thấy số 200 trả về là thằng code server auto đẹp trai :)');
});