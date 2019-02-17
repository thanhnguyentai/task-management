import UserService from '../services/users';

const express = require('express');
const router = express.Router();

const LOGIN_COOKIE_NAME = "task-manager-cookie-login";
const LOGIN_COOKIE_MAXAGE = 30*24*60*60*1000;

/**
 * Check if a user has already logged in
 */

router.get('/isloggin', function(req, res, next){
  try {
    const user = req.signedCookies;
    if(user._id) {
      res.json({
        isLoggin: true
      });
    } else {
      res.status(401);
      res.json({
        isLoggin: true
      });
    }
  } catch(err) {
    res.status(401);
      res.json({
        isLoggin: true
      });
  }
});
/**
 * Login 
 * */
router.get('/', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  
  UserService.login(email, password)
  .then(doc => {
    res.cookie(LOGIN_COOKIE_NAME, doc, {
      maxAge: Date.now() + LOGIN_COOKIE_MAXAGE,
      httpOnly: true,
      signed: true
    });

    const user = {
      id: doc._id,
      name: doc.name,
      email: doc.email
    };

    res.json(user);
  }).catch(err => {
    console.log(err);
    res.status(401);
    res.json(err);
  });
});

/**
 * Create an account
 */
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  UserService.create(name, email, password).then(doc => {
    res.cookie(LOGIN_COOKIE_NAME, doc, {
      maxAge: Date.now() + LOGIN_COOKIE_MAXAGE,
      httpOnly: true,
      signed: true
    });

    const user = {
      id: doc._id,
      name: doc.name,
      email: doc.email
    };
    
    res.json(user);
  }).catch(err => {
    res.status(500);
    res.json(err);
  })
});

module.exports = router;
