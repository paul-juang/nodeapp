const fs = require('fs');

const express = require('express');

const router = express.Router();

const Agk = require('../models/agk');

router.get("/agk",function(req, res) {
	res.sendFile("/paul/html/agk.html");
});

router.get('/getagk', function(req, res) {
	Agk
	.find({})
	.select('_id acctno acctname dr cr date') 
	.exec()
	.then(function(results){

		let json = JSON.stringify(results);    

		fs.writeFile('ledge.json', json, 'utf8', function(err,result){ 

			if(err) {
				console.log(err);
				res.send('error in get document');  
			}else
			res.send({ledge: results}); 
		});

	})  

	.catch(function(err){
		console.log(err);
		res.send('find error');  
	})

}) 


router.post('/agk', function(req, res) {   

	let newacctno = req.body.acctno;
	let newacctname = req.body.acctname;
	let newdr = req.body.dr;
	let newcr = req.body.cr;
	let newdate = req.body.date;


	let newItem = new Agk({
		acctno: newacctno,
		acctname: newacctname,
		dr: newdr,
		cr: newcr,
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


router.put('/agk/:id', function(req, res) {

	let id = req.params.id;
	let newacctno = req.body.newacctno;
	let newacctname = req.body.newacctname;
	let newdr = req.body.newdr;
	let newcr = req.body.newcr;
	let newdate = req.body.newdate;

	Agk.update({_id:id}, {$set: {acctno: newacctno, acctname: newacctname, dr: newdr, cr: newcr, date: newdate}})
	.exec()
	.then(function(result){
		console.log(result)
		res.send('success in update')
	})
	.catch(function(err){
		console.log(err)
		res.send('error in update')

	})
})


router.delete('/agk/:id', function(req, res) {

		let id = req.params.id;

		Agk.remove({_id:id}).exec()
		.then(function(result){
			res.send('delete success')
		})
		.catch(function(err){
			console.log(err)
			res.send('delete error')
		})

	});

router.get("/agkdraw",function(req, res) {
	res.sendFile("/paul/html/agkdraw.html");
});

module.exports = router;
