var express = require('express');
var router = express.Router();
//include our PartyModel
var PartyModel = require('../models/Party');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', renderSQL);
router.get('/:id', renderPartyById);


function renderPartyById(req, res, next){
	//call my individual model 
	//first, I need the ID from req.params
	var id = parseInt(req.params.id);
	console.log(typeof id);
	if (typeof id != 'number'){
		res.json({message: 'Invalid ID specified'});
	}
	PartyModel.where({
		id: id
	}).fetch().then(function(model){
		console.log(model);
		res.render('party', model.attributes);
	});
};

function renderSQL(req, res, next){
	//call my collection of rows (table)
	PartyModel.collection().fetch().then(function(models){
		// res.render('all', models);
		res.json(models);
	});
};

module.exports = router;
