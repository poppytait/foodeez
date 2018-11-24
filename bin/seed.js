// npm install mongoose

const mongoose = require('mongoose');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
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
const customers = [
  {
    email: 'jackwatk@hotmail.co.uk',
    password: 'jack'
  },
  {
    email: 'georgia@hotmail.co.uk',
    password: 'georgia'
  }

];

customers.forEach((customer) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(customer.password, salt);
  customer.password = hashedPassword;
});

User.create(customers)
  .then(() => {
    console.log('customers created');
  })
  .catch(error => {
    console.error(error);
  });

// Restaurant seed

const restauranteurs = [
  {
    email: 'chinese@gmail.com',
    password: 'chinese'
  },
  {
    email: 'mexican@gmail.com',
    password: 'mexican'
  }
]
;

restauranteurs.forEach((restauranteurs) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(restauranteurs.password, salt);
  restauranteurs.password = hashedPassword;
});

const restaurants = [
  {
    restaurantName: 'China King',
    foodType: 'Chinese'
  },
  {
    restaurantName: 'Mexican Madness',
    foodType: 'Mexican'
  }
];

for (let i = 0; i < restauranteurs.length; i++) {
  const restaurantName = restaurants[i].restaurantName;
  const restaurantFoodType = restaurants[i].foodType;

  User.create(restauranteurs[i])
    .then((restauranteur) => {
      Restaurant.create({
        restaurantName: restaurantName,
        foodType: restaurantFoodType,
        ownerId: restauranteur._id
      });
      console.log('restaurant created');
    })
    .catch(error => {
      console.error(error);
    });
}

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
