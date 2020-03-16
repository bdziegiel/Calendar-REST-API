'use strict';
module.exports = function(app) {
  var usersHandler = require('../controllers/userController');

  var VerifyToken = require('../verifyToken');
  
  app.route('/users')
    .get(usersHandler.getAllUsers)
    .post(usersHandler.createNewUser);

app.route('/users/:userId')
    .delete(VerifyToken, usersHandler.deleteUser)
    .put(VerifyToken, usersHandler.updateUser);
    
}; 