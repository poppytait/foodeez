'use strict';

const formMiddleware = {}; // We create an empty object and then we modify it

formMiddleware.requireFields = (req, res, next) => { // requireFields is the name of the function
  if (req.path === '/signup') {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash('message-name', 'Username or password cannot be empty'); // Username and password fields can't be empty
      return res.redirect(`/auth${req.path}`);
    }
    next();
  } else {
    const { restaurantName, foodType, email, password } = req.body;
    if (!restaurantName || !foodType || !email || !password) {
      req.flash('message-name', 'Restaurant name or food type or username or password cannot be empty'); // Restaurant name or food type or username or password cannot be empty
      return res.redirect(`/auth${req.path}`);
    }
    next();
  }
};

formMiddleware.isValidEmail = (req, res, next) => {
  const { email } = req.body;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  if (!validateEmail(email)) {
    req.flash('message-name', 'Email must be valid');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

formMiddleware.isPasswordOver6Characters = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    req.flash('message-name', 'Password must be more than 6 characters');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

module.exports = formMiddleware;
