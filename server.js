
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

//agkdraw
app.get("/agkdraw",function(req, res) {
  res.sendFile("/paul/html/agkdraw.html");
});




//for CRUD tree data
app.get("/treedata",function(req, res) {
  res.sendFile("/paul/html/treedata_s.html");
});


// get
app.get('/getdata', function(req, res) {

  TreeLayout
  .find({})
  .select('_id name parent idx date') 
  .exec()
  .then(function(results){

    let json = JSON.stringify(results);    

      //write  json file testData.json vs treeData.js
      fs.writeFile('treeData.json', json, 'utf8', function(err,result){ 

        if(err) {
          console.log(err);
          res.send('error in get document');  //send to client
        }else
          res.send({treedatas: results});  //send to client
        });

    })  

  .catch(function(err){
   console.log(err);
       res.send('find error');  //send to client
     })

}) 


//post
app.post('/treedata', function(req, res) {   
  
  let newname = req.body.name;
  let newparent = req.body.parent;
  let newidx = req.body.idx;
  let newdate = req.body.date;


  let newItem = new TreeLayout({
    name: newname,
    parent: newparent,
    idx: newidx,
    date: newdate
  });

  newItem.save()
  .then(function(result){
    res.send('success in save');
  })
  .catch(function(err){
    let error = new Error('save error');
   console.log(error);
   res.send('error in save');
 }) 
  
});


//put - update document
app.put('/treedata/:id', function(req, res) {

  let id = req.params.id;
  let newname = req.body.newname;
  let newparent = req.body.newparent;
  let newidx = req.body.newidx;
  let newdate = req.body.newdate;


      //query method
      TreeLayout.update({_id:id}, {$set: {name: newname, parent: newparent, idx: newidx, date: newdate}})
      .exec()
      .then(function(result){
        console.log(result)
        res.send('success in update')
      })
      .catch(function(err){
       console.log(err)
       res.send('error in update')

     })

/*
    TreeLayout.findByIdAndUpdate({_id: id }, {$set: {name: newname, parent: newparent, idx: newidx}},
           function(err,result){

             if (err) {
                console.log(err);
                res.send('update error');
             }else {
                res.send('successfully update document.')
             }

           });

           */

         });


//delete
app.delete('/treedata/:id', function(req, res) {

  let id = req.params.id;

    //query method
    TreeLayout.remove({_id:id}).exec()
    .then(function(result){
      console.log(result)
      res.send('success in delete')
    })
    .catch(function(err){
     console.log(err)
     res.send('error in delete')

   })

 /* 
    TreeLayout.findByIdAndRemove({_id: id },function(err,result){
             if (err) {
                console.log(err);
                res.send('delete  error');
             }else {
                res.send('successfully delete document.')
             }
    })
    */

  });


//draw tree all entries
app.get("/drawtree",function(req, res) {  
  res.sendFile("/paul/html/drawtree_s.html");
});


//draw tree by selection
//send drawtree_x.html
app.get("/drawtreex",function(req, res) {
  res.sendFile("/paul/html/drawtree_x.html");
});


//getJSON and draw tree
app.get('/drawtreex/:name', function(req, res) {

  let name = req.params.name;

  TreeLayout
  .find({})
  .select('_id name parent idx') 
  .exec()
  .then(function(results){

    let found = false;

    for (var i = 0; i < results.length; i++) {

      if (!found && results[i].name === name) {
        
        results = results.splice(i);

      }
      
    }
    
    results[0].parent = '0';
    let json = JSON.stringify(results);    

      //write  json file testData.json vs treeData.js
      fs.writeFile('testDatax.json', json, 'utf8', function(err,result) { 

        if(err) {
          console.log(err);
          res.send('error in write json file');  //send to client

        }else
          res.send('success write testDatax.json');  //send to client
        });

    })  

  .catch(function(err){    
       console.log(err);
       res.send('error in draw tree layout');  //send to client
     })

}) 

app.get("/agkdraw",function(req, res) {
  res.sendFile("/paul/html/agkdraw.html");
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});

