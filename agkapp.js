
const fs = require('fs');

const express = require('express');

const path = require('path');

const app = express();

const mongoose = require('mongoose');

const TreeLayout = require('./models/treeData');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/treedatabase')

.then(function(){

  console.log("Database connected ...");
});

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(require('./routes/agk'));
app.use(require('./routes/tree'));

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});

