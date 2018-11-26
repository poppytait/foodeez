'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isCustomer: {
    type: Boolean,
    required: true
  },
  address: {
    addressLine1: String,

    addressLine2: String,

    city: String,

    postcode: String
  },

  phoneNumber: String,

  allergies: String,

  dietaryRequirements: String

});

const User = mongoose.model('User', userSchema);

module.exports = User;
