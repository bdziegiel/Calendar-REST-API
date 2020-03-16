var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Event = require('./models/eventModel'),
  User = require('./models/userModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/projektII');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var eventRoutes = require('./routes/eventRoutes');
var userRoutes = require('./routes/userRoutes');
eventRoutes(app);
userRoutes(app);

var authController = require('./controllers/authController');
app.use(authController);

app.listen(port);
console.log('Server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });