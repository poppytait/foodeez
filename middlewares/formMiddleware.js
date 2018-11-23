'use strict';

const formMiddleware = {}; // We create an empty object and then we modify it

formMiddleware.requireFields = (req, res, next) => { // requireFields is the name of the function
  const { email, password } = req.body;
  if (!email || !password) {
    // req.flash('message-name', 'Username or password cannot be empty'); // Username and password fields can't be empty
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

module.exports = formMiddleware;
