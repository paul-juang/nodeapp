
const fs = require('fs');

const express = require('express');

const router = express.Router();

const TreeLayout = require('../models/treeData');
/*
const Loto539 = require('../models/loto539');

const Loto649 = require('../models/loto649');


//loto
router.get("/loto",function(req, res) {
    res.sendFile("/paul/html/loto.html");
});

router.get('/lotodata/539',function(req,res) {
  
  Loto539
    .find({})
    .exec()
    .then(function(results){
      res.send({arrOfLotonum: results})
   })  
   .catch(function(err){
      console.log(err);
      res.send('find error');  //send to client
     })
})

router.post("/lotodata/539",function(req, res) {
  let arrOfLotonum = req.body.arrOfLotonum;

  console.log(arrOfLotonum);  
  
  Loto539.collection.insert(arrOfLotonum)
  .then(function(results) {
    console.log(results);
    res.send("insert collection sucess")
  })
  .catch(function(err) {
    console.log(err);
    res.send("insert collection error")
  })

});

router.get('/lotodata/649',function(req,res) {
  
  Loto649
    .find({})
    .exec()
    .then(function(results){
      res.send({arrOfLotonum: results})
   })  
   .catch(function(err){
      console.log(err);
      res.send('find error');  //send to client
     })
})

router.post("/lotodata/649",function(req, res) {
  let arrOfLotonum = req.body.arrOfLotonum;

  console.log(arrOfLotonum);  
  
  Loto649.collection.insert(arrOfLotonum)
  .then(function(results) {
    console.log(results);
    res.send("insert collection sucess")
  })
  .catch(function(err) {
    console.log(err);
    res.send("insert collection error")
  })

});


//starwar
router.get("/starwar",function(req, res) {
    res.sendFile("/paul/html/starwar.html");
});


//get https json for star war
router.get("/getHttps",function(req, res) {

  let output = '';

  https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",function(resp) {
    //receiving data in chunk
    resp.on("data",function(chunk) {
      output += chunk;
    })
    // The whole response has been received. Print out the result.
    resp.on("end",function() {
      output = JSON.parse(output);
      res.send({imgUrl:output.hdurl,nasaDescription:output.explanation});
    })

  }).on("error",function(err) {
     console.log(err);
     res.send("error in getting NASA url")
    })
  
});


//test d3
router.get("/d3test",function(req, res) {
    res.sendFile("/paul/html/d3test.html");
});


router.get("/test",function(req, res) {
    res.sendFile("/paul/html/test.html");
});


router.get("/test2",function(req, res) {
    res.sendFile("/paul/html/test2.html");
});

*/


//for CRUD tree data
router.get("/treedata",function(req, res) {
    res.sendFile("/paul/html/treedata_s.html");
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
router.delete('/treedata/:id', function(req, res) {

    let id = req.params.id;

    //query method
    TreeLayout.remove({_id:id}).exec()
    .then(function(result){
      //console.log(result)
      res.send('delete success')
    })
    .catch(function(err){
     console.log(err)
      res.send('delete error')

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


//draw tree layout drawtree_s.html vs darwtree_t.html
router.get("/drawtree",function(req, res) {  
    res.sendFile("/paul/html/drawtree_t.html");
});


//draw tree layout by name

//send drawtree_x.html
router.get("/drawtreex",function(req, res) {

    res.sendFile("/paul/html/drawtree_x.html");

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
