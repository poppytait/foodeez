'use strict';

const formMiddleware = {}; // We create an empty object and then we modify it

formMiddleware.requireFields = (req, res, next) => { // requireFields is the name of the function
  if (req.path === '/signup' || req.path === '/login') {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash('message-name', 'Username or password cannot be empty'); // Username and password fields can't be empty
      return res.redirect(`/auth${req.path}`);
    }
  } else if (req.path === '/restaurantSignup') {
    const { restaurantName, foodType, email, password } = req.body;
    if (!restaurantName || !foodType || !email || !password) {
      req.flash('message-name', 'Restaurant name or food type or username or password cannot be empty'); // Restaurant name or food type or username or password cannot be empty
      return res.redirect(`/auth${req.path}`);
    }
  } else if (req.path === '/new') {
    const { addressLine1, addressLine2, city, postcode } = req.body;
    if (!addressLine1 || !addressLine2 || !city || !postcode) {
      req.flash('message-name', 'Address details cannot be empty'); // Address details cannot be empty
      return res.redirect('/order');
    }
  } else if (req.path === '/editProfile') {
    const { addressLine1, addressLine2, city, postcode, phoneNumber } = req.body;
    if (!addressLine1 || !addressLine2 || !city || !postcode || !phoneNumber) {
      req.flash('message-name', 'Contact details cannot be empty'); // Contact details cannot be empty
      return res.redirect('/users/editProfile');
    }
  } else if (req.path === `/${req.params.id}/edit`) {
    const { addressLine1, addressLine2, city, postcode } = req.body;
    if (!addressLine1 || !addressLine2 || !city || !postcode) {
      req.flash('message-name', 'Address details cannot be empty'); // Address details cannot be empty
      return res.redirect(`/orderlist${req.path}`);
    }
  }
  next();
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
