// npm install mongoose

const mongoose = require('mongoose');

const User = require('../models/user');
// --

mongoose.connect('mongodb://localhost/foodeze', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

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

User.create(users)
  .then(() => {
    console.log('users created');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error(error);
  });
