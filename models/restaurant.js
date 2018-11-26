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
  foodType: {
    type: String,
    // enum: ['American', 'Chinese', 'Spanish', 'Indian', 'Italian', 'Japanese', 'Turkish', 'Mexican'],
    required: true
  }

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
