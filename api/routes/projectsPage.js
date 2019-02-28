var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Management' });
});
router.get('/:task', function(req, res, next) {
  res.render('index', { title: 'Task Management' });
});

module.exports = router;
