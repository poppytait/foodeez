'use strict';

const authMiddleware = {}; // We create an empty object and then we modify it

authMiddleware.requireAnon = (req, res, next) => { // requireAnon is the name of the function
  if (req.session.currentUser) { // If the user is logged in, redirect him to / page
    return res.redirect('/');
  }
  next();
};

authMiddleware.requireUser = (req, res, next) => { // requireUser is the name of the function
  if (!req.session.currentUser) { // If the user is not loged in and tries to logout, redirect him to login page
    return res.redirect('/auth/login');
  }
  next();
};



module.exports = authMiddleware;
