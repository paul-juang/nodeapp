
const fs = require('fs');

const express = require('express');

const path = require('path');

const app = express();

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(function(err,req,res,next) {
    if (err) {
      console.log(err);
    }
          res.send("<h1>Woop Error!</h1>")

    next();
})



//read json file
let text = fs.readFileSync('myjsonfile.json','utf8').trim();

if (!text) {
   var treedatas = [];  //let - block scope, var is not
   var currentindex = 0;  
}
else if( text === "[]") {
   var treedatas = [];
   var currentindex = 0;
}
else {  
 var treedatas = JSON.parse(text);
 var currentindex = treedatas[treedatas.length-1].index;

};



//send treedata_a.html

app.get("/treedata",function(req, res) {
    //res.sendFile("/paul/html/treedata_a.html");
    res.render("treedata_a");
});

//CRUD tree data
//get
app.get('/getdata', function(req, res) {

//write array of obj to json file
    let json = JSON.stringify(treedatas);

    fs.writeFile('myjsonfile.json', json, 'utf8', function(){
    });

//send to client
    res.send({ treedatas: treedatas });
});


//post
app.post('/treedata', function(req, res) {

    currentindex++;

    let newname = req.body.name;
    let newparent = req.body.parent;
    let newidx = req.body.idx;

    treedatas.push({    //save new document
         name: newname,
         parent: newparent,
         idx: newidx,
         index: currentindex
    });

    res.send('Successfully created treedata!');
});


//put - update document
app.put('/treedata/:id', function(req, res) {

    let id = req.params.id;
    let newname = req.body.newname;
    let newparent = req.body.newparent;
    let newidx = req.body.newidx;

    let found = false;

    treedatas.forEach(function(treedata, index) {

        if (!found && treedata.index === Number(id)) {  //find and update document
                 treedata.name = newname;
                 treedata.parent = newparent;
                 treedata.idx = newidx;
        }

    });

    res.send('Succesfully updated treedata!');
});


//delete
app.delete('/treedata/:id', function(req, res) {

    let id = req.params.id;
    let found = false;

    treedatas.forEach(function(treedata, index) {  //find and delete document
      
      if (!found && treedata.index === Number(id)) {
            treedatas.splice(index, 1);
        }
    });

    res.send('Successfully deleted treedata!');
});

//draw tree using getJSON

app.get("/drawtree",function(req, res) {  
    //res.sendFile("/paul/html/drawtree_a.html");
    res.render("drawtree_a");
});


// default sending index.html at
// the project root directory as follows:

/*
app.get("/",function(req, res) {
    res.sendFile("/paul/html/index.html");
});
*/


// draw tree  - with test data for index.html

app.get("/test",function(req, res) {
    res.sendFile("/paul/node/testData.html");
});


//for star war
app.get("/starwar",function(req, res) {  
    res.sendFile("/paul/html/starwarx.html");
});



app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

