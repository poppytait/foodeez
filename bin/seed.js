// npm install mongoose
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
// const Order = require('../models/order');
// const ObjectId = require('mongoose').Types.ObjectId;

// -- bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect(
  process.env.MONGODB_URI,
  {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE
  }
);

// Users seed
const customers = [
  {
    email: 'jackwatk@hotmail.co.uk',
    password: '123456',
    isCustomer: true,
    address: {
      addressLine1: 'Pamplona 96',
      addressLine2: 'Bajos',
      city: 'Barcelona',
      postcode: '08018'
    }
  },
  {
    email: 'poppytait@gmail.com',
    password: '123456',
    isCustomer: true,
    address: {
      addressLine1: 'Pamplona 96',
      addressLine2: '1º 1ª',
      city: 'Barcelona',
      postcode: '08018'
    }
  },
  {
    email: 'sllonk@gmail.com',
    password: '123456',
    isCustomer: true,
    address: {
      addressLine1: 'Pamplona 96',
      addressLine2: '1º 2ª',
      city: 'Barcelona',
      postcode: '08018'
    }
  },
  {
    email: 'georgia@hotmail.co.uk',
    password: '123456',
    isCustomer: true,
    address: {
      addressLine1: 'Pamplona 96',
      addressLine2: 'Bajos',
      city: 'Barcelona',
      postcode: '08018'
    }
  }
];

customers.forEach(customer => {
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
    password: '123456',
    isCustomer: false
  },
  {
    email: 'mexican@gmail.com',
    password: '123456',
    isCustomer: false
  }
];
restauranteurs.forEach(restauranteurs => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(restauranteurs.password, salt);
  restauranteurs.password = hashedPassword;
});

const restaurants = [
  {
    restaurantName: 'China King',
    foodType: 'chinese',
    location: {
      coordinates: [41.3975248, 2.1910079]
    }
  },
  {
    restaurantName: 'Mexican Madness',
    foodType: 'mexican',
    location: {
      coordinates: [41.4007419, 2.1987251]
    }
  }
];

for (let i = 0; i < restauranteurs.length; i++) {
  const restaurantName = restaurants[i].restaurantName;
  const restaurantFoodType = restaurants[i].foodType;
  const coordinates = restaurants[i].location.coordinates;
  console.log(restaurants[i].location.coordinates);

  User.create(restauranteurs[i])
    .then(restauranteur => {
      Restaurant.create({
        restaurantName: restaurantName,
        foodType: restaurantFoodType,
        location: { coordinates: coordinates },
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
    address: {
      addressLine1: 'Pamplona 96',
      addressLine2: 'Bajos',
      city: 'Barcelona',
      postcode: '08018'
    },
    phoneNumber: '612345678',
    undesiredFoodType: ['spanish', 'indian'],
    allergies: 'Peanuts',
    dietaryRequirements: 'Gluten-free',
    budget: 50,
    price: null,
    numberOfFoodeez: 2,
    willServe: null,
    isCompleted: false
  },
  {
    address: {
      addressLine1: 'Pamplona 96',
      addressLine2: '1º 2ª',
      city: 'Barcelona',
      postcode: '08018'
    },
    phoneNumber: '612345678',
    undesiredFoodType: ['italian', 'american'],
    allergies: 'Apples',
    dietaryRequirements: 'Halal',
    budget: 30,
    price: null,
    numberOfFoodeez: 2,
    willServe: null,
    isCompleted: false
  }
];

for (let i = 0; i < orders.length; i++) {
  const timestamp = Date();
  const restaurantId = ObjectId(restaurants[i]._id);
  const userId = ObjectId(customers[i]._id);
  const addressLine1 = orders[i].addressLine1;
  const addressLine2 = orders[i].addressLine2;
  const city = orders[i].addressLine1;
  const postcode = orders[i].postcode;
  const phoneNumber = orders[i].phoneNumber;
  const undesiredFoodType = orders[i].undesiredFoodType;
  const allergies = orders[i].allergies;
  const dietaryRequirements = orders[i].dietaryRequirements;
  const budget = orders[i].budget;
  const price = orders[i].price;
  const numberOfFoodeez = orders[i].numberOfFoodeez;
  const willServe = orders[i].willServe;
  const isCompleted = orders[i].isCompleted;

  Order.create({
    timestamp,
    restaurantId,
    userId,
    address: {
      addressLine1,
      addressLine2,
      city,
      postcode
    },
    phoneNumber,
    undesiredFoodType,
    allergies,
    dietaryRequirements,
    budget,
    price,
    numberOfFoodeez,
    willServe,
    isCompleted
  })
    .then(() => {
      console.log('order created');
    })
    .catch(error => {
      console.error(error);
    });
}

*/
