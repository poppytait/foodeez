'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const orderSchema = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  restaurantId: {
    type: ObjectID,
    required: false
  },
  userId: {
    type: ObjectID,
    required: true
  },
  preferences: {
    allergies: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: true
    },
    dietaryRequirements: {
      type: String,
      enum: ['Gluten-free', 'Halal', 'Kosher', 'Lactose-free', 'Pescatarian', 'Vegan', 'Vegetarian'],
      required: false
    }
  },
  undesiredFoodType: {
    type: Array,
    required: false
  },
  budget: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numberOfFoodeez: {
    type: Number,
    required: true
  },
  willServe: {
    type: Boolean,
    required: false
  },
  isCompleted: {
    type: Boolean,
    required: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
