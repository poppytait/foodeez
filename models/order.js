'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const orderSchema = new Schema({
  timestamp: {
    type: Date
  },
  restaurantId: {
    type: ObjectID,
    ref: 'Restaurant'
  },
  userId: {
    type: ObjectID,
    ref: 'User'
  },
  address: {
    addressLine1: String,

    addressLine2: String,

    city: String,

    postcode: String
  },

  phoneNumber: String,

  undesiredFoodType: Array,

  allergies: String,

  dietaryRequirements: String,
  // enum: ['Gluten-free', 'Halal', 'Kosher', 'Lactose-free', 'Pescatarian', 'Vegan', 'Vegetarian']

  budget: Number,

  price: Number,

  numberOfFoodeez: Number,

  willServe: {
    type: Boolean,
    default: null
  },
  isCompleted: {
    type: Boolean,
    defaulte: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
