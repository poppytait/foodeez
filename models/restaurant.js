'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const restaurantSchema = new Schema({
  ownerId: {
    type: ObjectID,
    ref: 'User'
  },
  restaurantName: {
    type: String,
    required: true
  },
  location: {
    // coordinates: Array
    lat: Number,
    lng: Number

  },
  foodType: {
    type: String,
    enum: ['american', 'chinese', 'spanish', 'indian', 'italian', 'japanese', 'turkish', 'mexican'],
    required: true
  }
});

restaurantSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
