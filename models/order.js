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
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  postcode: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  undesiredFoodType: {
    type: Array
  },
  allergies: {
    type: String
  },
  dietaryRequirements: {
    type: String,
    enum: ['Gluten-free', 'Halal', 'Kosher', 'Lactose-free', 'Pescatarian', 'Vegan', 'Vegetarian']
  },
  budget: {
    type: Number
  },
  price: {
    type: Number
  },
  numberOfFoodeez: {
    type: Number
  },
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
