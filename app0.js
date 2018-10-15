
const fs = require('fs');

const express = require('express');

const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
 
//mongoose.connect('mongodb://localhost:27017/testdatabase') //testdatabase vs treedatabase
mongoose.connect('mongodb://localhost:27017/testdatabase',{useNewUrlParser:true}) //not supported here why

.then(function(){

    console.log("Database connected ...");
});

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

//use router
app.use(require('./routes/tree'));

app.use(require('./routes/ledger'));

app.use(require('./routes/agk'));

app.use(require('./routes/loto'));

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

