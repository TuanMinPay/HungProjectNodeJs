var Profile = require('../models/profileModel');

require('mongoose-pagination');
var crypto = require('crypto');

exports.getDetail = function(req, res){	
	res.send("Say Hi");
}

exports.addProfile = function(req, res){
	var obj = new Profile(req.body);
	obj.save(function(err){
		if(err){
			res.send(err);
			return;
		}
		res.send(obj);
	});
}

exports.update = function(req, res){
	Profile.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
	    res.json(result);
	});
}

exports.delete = function(req, res){
	Profile.findById(req.params.id,function(err, result){
		result.status = 0;
		Profile.findOneAndUpdate({_id: req.params.id}, result, {new: true}, function(err, result) {
		    res.json(result);
		});
	});	
}