'use strict';
module.exports = function(app) {
  var eventsHandler = require('../controllers/eventController');

  var VerifyToken = require('../verifyToken');

  app.route('/events')
    .get(eventsHandler.getAllEvents)
    .post(eventsHandler.addEvent);

  app.route('/events/:eventId')
    .get(eventsHandler.getEventById)
    .put(VerifyToken, eventsHandler.updateEvent)
    .delete(VerifyToken, eventsHandler.deleteEventById);
};
