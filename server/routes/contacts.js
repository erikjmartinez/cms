var express = require('express');
var router = express.Router();

var sequenceGenerator = require('./sequenceGenerator');

const Contact = require("../models/contact");

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Contact.find()
    .then(contacts => {
      res.status(200).json({
        message: 'Contacts fetched successfully',
        contacts: contacts
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
  Contact.findOne({
      contactId: +req.params.id
    })
    .populate('group')
    .then(contact => {
      res.status(200).json({
        message: 'Contact fetched successfully',
        contact: contact
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    contactId: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    imageURL: req.body.imageURL
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({
      contactId: +req.params.id
    })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phoneNumber = req.body.phoneNumber;
      contact.imageURL = req.body.imageURL;
      contact.group = req.body.group;

      Contact.updateOne({
          contactId: +req.params.id
        }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: {
          contact: 'Contact not found'
        }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({
      contactId: +req.params.id
    })
    .then(contact => {
      Contact.deleteOne({
          contactId: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;
