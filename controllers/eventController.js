'use strict';
var mongoose = require('mongoose'),
  Event = mongoose.model('Events'),
  querystring = require('querystring');

exports.getAllEvents = function(req, res) {
  Event.find(req.query, function(err, event) {
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).send(event);
  });
};

exports.addEvent = function(req, res) {
  var newEvent = new Event(req.body);
  newEvent.save(function(err, event) {
    if(err instanceof mongoose.Error.ValidationError) return res.status(400).send('Wrong input');
    if (err) return res.status(500).send("Internal Server Error");
    res.status(200).send(event);
  });
};

exports.getEventById = function(req, res) {
  Event.findById(req.params.eventId, function(err, event) {
    if(!event) return res.status(404).send("Event not found");
    if(err) return res.status(500).send("Internal Server Error");
    res.status(200).send(event);
  });
};

exports.updateEvent = function(req, res) {
  Event.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}, function(err, event) {
    if(!event) return res.status(404).send("Event not found");
    if(err instanceof mongoose.Error.ValidationError) return res.status(400).send("Wrong input");
    if(err) return res.status(500).send("Internal Server Error");
    res.status(200).send(event);
  });
};

exports.deleteEventById = function(req, res) {
  Event.remove({_id: req.params.eventId}, function(err, event) {
    if (!event) return res.status(404).send("Event not found");
        if (err) return res.status(500).send("Internal Server Error");
        res.status(200).send("Event deleted");
      });
};