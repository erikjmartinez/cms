const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  contactId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }
});

module.exports = mongoose.model('Contact', contactSchema);
