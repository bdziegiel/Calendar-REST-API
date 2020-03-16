var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    location: String,
    username: String,
    priority: {
        type: [{
          type: String,
          enum: ['high', 'medium', 'low']
        }],
        default: ['high'] 
      }
 });

 module.exports = mongoose.model('Events', eventSchema);