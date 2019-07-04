var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  documentId: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Document', schema);
