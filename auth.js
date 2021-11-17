const db = require("./db/models");
const session = require('express-session');

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id
  }
  req.session.save(() => {
    res.redirect('/')
  })
}

const logoutUser = (req, res, user) => {
  delete req.session.auth;
  req.session.save(() => {
    res.redirect('/')
  })
}

// middleware function that can be added to any routes that we want to restrict to logged in users.
const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect("/login")
  }
  return next()
};

const restoreUser = async (req, res, next) => {
  // Log the session object to the console
  // to assist with debugging.
  // console.log(req.session);

  if (req.session.auth) {
    // If we had an auth key, that means we are logged in in. We pull the userId out of auth, then find the user record associated with it.
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        // If we successfully found the user, we indicate that we are authenticated and add the user information to the response's locals key for use in other middleware/routes
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      };
    } catch (err) {
      // If we ran into an error finding our user, we indicate we are not authenticated and invoke our error handlers
      res.locals.authenticated = false;
      next(err);
    };
  } else {
    // If we didn't have an auth key at all, we indicate we are not authenticated and continue to the next middleware (or routes)
    res.locals.authenticated = false;
    next();
  };
};

module.exports = {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser
};
