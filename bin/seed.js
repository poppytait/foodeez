// npm install mongoose

const mongoose = require('mongoose');
const User = require('../models/user');
// const Order = require('../models/order');

// -- bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://localhost/foodeez', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

// Users seed
const users = [
  {
    email: 'jackwatk@hotmail.co.uk',
    password: 'jack'
  },
  {
    email: 'georgia@hotmail.co.uk',
    password: 'georgia'
  }

];
users.forEach((user) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;
});

User.create(users)
  .then(() => {
    console.log('users created');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
  });

// Order seed
/*
const orders = [
  {
    timestamp: '',
    restaurantId: '',
    userId: '',
    preferences: {
      allergies: {

      },
      address: {

      },
      dietaryRequirements: {

      }
    },
    undesiredFoodType: '',
    budget: '',
    price: '',
    numberOfFoodeez: '',
    willServe: '',
    isCompleted: ''
  },
  {
    timestamp: '',
    restaurantId: '',
    userId: '',
    preferences: {
      allergies: {

      },
      address: {

      },
      dietaryRequirements: {

      }
    },
    undesiredFoodType: '',
    budget: '',
    price: '',
    numberOfFoodeez: '',
    willServe: '',
    isCompleted: ''
  }
];

Order.create(orders)
  .then(() => {
    console.log('orders created');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
  });
*/
