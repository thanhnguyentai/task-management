import UserService from '../services/users';

const express = require('express');
const router = express.Router();
const cookieHelper = require('../helpers/cookie');

/**
 * Check if a user has already logged in
 */

router.get('/session', function(req, res, next){
  try {
    const userSession = cookieHelper.getAuthenticatedCookie(req);

    if(userSession && userSession._id) {
      const user = {
        id: userSession._id,
        name: userSession.name,
        email: userSession.email
      };
      res.json(user);
    } else {
      res.json({ isLoggin: false });
    }
  } catch(err) {
    res.status(500);
    res.json({ isLoggin: false});
  }
});
/**
 * Login 
 * */
router.get('/', function(req, res, next) {
  const email = req.query.email;
  const password = req.query.password;

  UserService.login(email, password).then(doc => {
    if(!doc.error) {
      cookieHelper.setCookieForAuthenticate(res, doc);
  
      const user = {
        id: doc._id,
        name: doc.name,
        email: doc.email
      };
      res.json(user);
    } else {
      res.status(400);
      res.json(doc);
    }
  }).catch(err => {
    res.status(500);
    res.json(err);
  });
});

/**
 * Logout
 */
router.get('/logout', function(req, res, next) {
  cookieHelper.clearAuthenticatedCookie(res);
  res.json({ message: 'logout is successful' });
});

/**
 * Create an account
 */
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  UserService.create(name, email, password).then(doc => {
    if(!doc.error) {
      cookieHelper.setCookieForAuthenticate(res, doc);
  
      const user = {
        id: doc._id,
        name: doc.name,
        email: doc.email
      };
      
      res.json(user);
    } else {
      res.status(400);
      res.json(doc);
    }
  }).catch(err => {
    res.status(500);
    res.json(err);
  })
});

module.exports = router;
