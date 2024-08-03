const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  /*userId: {
    type: String,   //get this from aws cognito somehow
    required: true
  },*/
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  /*address: {
    type: String
  }*/
});

const Contact = mongoose.model("Contact",ContactSchema);
module.exports = Contact;

