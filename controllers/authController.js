var Account = require('../models/userModel');
var Profile = require('../models/profileModel');

require('mongoose-pagination');
var crypto = require('crypto');

exports.getDetail = function (req, res) {
    Account.findById(req.query.userId, function (accErr, result) {
        if (accErr) {
            res.send("Something went wrong");
            return;
        }
        if (!result) {
            res.status(404).send("Account not found");
            return;
        }
        Profile.findOne({ userId: result._id }, function (prfErr, profile) {
            if (prfErr) {
                res.send("Something went wrong");
                return;
            }
            res.send(profile);
        });
    });
}

exports.addMember = function (req, res) {
    var obj = new Account(req.body);
    var salt = Math.random().toString(36).substring(7);
    obj.salt = salt;
    obj.password = sha512(obj.password, obj.salt);
    obj.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(obj);
    });
}

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
};

exports.sha512 = sha512;

exports.update = function (req, res) {
    Account.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, result) {
        res.json(result);
    });
}

exports.delete = function (req, res) {
    // Account.findById(req.params.id, function (err, result) {
    //     result.status = 0;
    //     Account.findOneAndUpdate({ _id: req.params.id }, result, { new: true }, function (err, result) {
    //         res.json(result);
    //     });
    // });
    Account.findById(req.query.userId, function (accErr, result) {
        if (accErr) {
            res.send("Something went wrong");
            return;
        };
        if (!result) {
            res.status(404).send("Account not found");
            return;
        }
        var profile = new Promise((resolve, reject) => {
            Profile.findOneAndDelete({ userId: req.query.userId }, function (err, result) {
                if (err) {
                    console.log(error);
                    reject();
                    return;
                }
                resolve();
            });
        });
        var account = new Promise((resolve, reject) => {
            Account.findOneAndDelete({ _id: req.query.userId }, function (err, result) {
                if (err) {
                    console.log(error);
                    reject();
                    return;
                }
                resolve();
            });
        });
        Promise.all([profile, account]).then((success) => {
            res.send("Delete success");
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Something went wrong");
        })
    });
}