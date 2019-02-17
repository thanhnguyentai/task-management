import UserService from '../services/users';


const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('get user api');
});

router.post('/user', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  UserService.create(name, email, password).then(newUser => {
    res.json(newUser);
  }).catch(err => {
    res.status(500);
    res.json(err);
  })
});

module.exports = router;
