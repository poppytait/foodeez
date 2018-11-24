// npm install mongoose

const mongoose = require('mongoose');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Order = require('../models/order');

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

const orders = [
  {
    undesiredFoodType: [
      'spanish',
      'indian'
    ],
    willServe: null,
    addressLine1: 'Pamplona 96',
    addressLine2: 'Bajos',
    budget: 50,
    city: 'Barcelona',
    dietaryRequirements: 'Gluten-free',
    numberOfFoodeez: 2,
    phoneNumber: '612345678',
    postcode: '08018'
  },
  {
    undesiredFoodType: [
      'italian',
      'indian'
    ],
    willServe: null,
    addressLine1: 'Pamplona 96',
    addressLine2: '1º 2ª',
    budget: 30,
    city: 'Barcelona',
    dietaryRequirements: 'Halal',
    numberOfFoodeez: 1,
    phoneNumber: '612345679',
    postcode: '08018'
  }
];

for (let i = 0; i < orders.length; i++) {
  const timestamp = Date();
  const undesiredFoodType = orders[i].undesiredFoodType;
  const willServe = orders[i].willServe;
  const addressLine1 = orders[i].addressLine1;
  const addressLine2 = orders[i].addressLine2;
  const budget = orders[i].budget;
  const city = orders[i].addressLine1;
  const dietaryRequirements = orders[i].dietaryRequirements;
  const numberOfFoodeez = orders[i].numberOfFoodeez;
  const phoneNumber = orders[i].phoneNumber;
  const postcode = orders[i].postcode;

  Order.create(orders[i])
    .then((order) => {
      Order.create({
        timestamp,
        undesiredFoodType,
        willServe,
        addressLine1,
        addressLine2,
        budget,
        city,
        dietaryRequirements,
        numberOfFoodeez,
        phoneNumber,
        postcode
      });
      console.log('order created');
    })
    .catch(error => {
      console.error(error);
    });
}
