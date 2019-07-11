var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

var getMessages = function (req, res) {
  Message.find(req.params.id, (err, message) => {
    if (err)
      res.status(500).json({
        message: 'Error getting messages :('
      });
    else
      res.status(200).json({
        message: 'Added successfully'
      });
  });
}

var deleteMessage = function (req, res) {
  Message.remove(req.params.id, (err, message) => {
    if (err)
      res.status(500).json({
        message: 'Error'
      });
    getMessages(message);
  });
}

router.get('/', (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully',
        messages: messages
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
      messageId: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        document: createdMessage
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', function (req, res) {
  Message.findOne({
    id: req.params.id
  }, function (err, message) {
    if (err || !message) {
      return res.status(500).json({
        title: 'No message found',
        error: {
          message: 'Message not found'
        }
      });
    }
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;
    saveMessage(res, message);
  });
});

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'no message found',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'no message found',
        error: {
          messageId: req.params.id
        }
      });
    }
    deleteMessage(res, message);
  });
});

module.exports = router;