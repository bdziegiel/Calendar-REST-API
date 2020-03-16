"use strict";
var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.getAllUsers = function(req, res){
    User.find({}, {password: 0}, function(err, user){
        if (err) return res.status(500).send("Internal Server Error");
        res.status(200).send(user);
    })
 };

 exports.createNewUser = function(req, res){
    var newUser =  new User(req.body);
    newUser.save(function(err, user){
            if(err instanceof mongoose.Error.ValidationError) return res.status(400).send('Wrong input');
            if (err) return res.status(500).send("Internal Server Error");
            res.status(200).send(user);
        });
};

exports.deleteUser = function(req, res){
    User.findByIdAndRemove({_id: req.params.userId}, function (err, user) {
        if (!user) return res.status(404).send("User not found");
        if (err) return res.status(500).send("Internal Server Error");
        res.status(200).send("User deleted");
    });
};

exports.updateUser = function(req, res, next){
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true, fields: {password: 0}}, 
        function(err, user){
        if (!user) return res.status(404).send("User not found");
        if(err instanceof mongoose.Error.ValidationError) return res.status(400).send('Wrong input');
        if (err) return res.status(500).send("Internal Server Error");
        res.status(200).send(user);
    });
};