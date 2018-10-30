
const fs = require('fs');

const express = require('express');

const router = express.Router();

const TreeLayout = require('../models/treeData');
   


//for CRUD tree data
router.get("/treedata",function(req, res) {
    res.render("treedata_s");
});



// get
router.get('/getdata', function(req, res) {

  TreeLayout
  .find({})
  .select('_id name parent idx date') 
  .exec()
  .then(function(results){

    let json = JSON.stringify(results);    

      //write  json file testData.json vs treeData.js
      fs.writeFile('testData.json', json, 'utf8', function(err,result){ 

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
router.post('/treedata', function(req, res) {   
  
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
router.put('/treedata/:id', function(req, res) {

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

 });


//delete
router.delete('/treedata/:id', function(req, res) {

    let id = req.params.id;

    //query method
    TreeLayout.remove({_id:id}).exec()
    .then(function(result){
      res.send('delete success')
    })
    .catch(function(err){
     console.log(err)
      res.send('delete error')

   })
    
});


//draw tree layout drawtree_s.html vs darwtree_t.html
router.get("/drawtree",function(req, res) {  
    res.render("drawtree_t");
});


//draw tree layout by name
//send drawtree_x.html
router.get("/drawtreex",function(req, res) {
    res.render("drawtree_x");
});


router.get('/drawtreex/:name', function(req, res) {

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
          break;
        }
        
      }
        
      results[0].parent = '0';     //set parent as root
      let json = JSON.stringify(results);    

      //write  json file testData.json vs treeData.js
      fs.writeFile('testDatax.json', json, 'utf8', function(err,result){ 

        if(err) {
          console.log(err);
          res.send('error in write json file');  //send to client

        }else
          res.send('success  write testDatax.json');  //send to client

      });

    })  

 .catch(function(err){
  
       console.log(err);
       res.send('error in draw tree layout');  //send to client

     })

}) 

module.exports = router;
