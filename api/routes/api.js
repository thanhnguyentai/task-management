const express = require('express');
const router = express.Router();
const apiUsersRouter = require('./apiUsers');
const authorizeMiddleware = require('../middlewares/authorize');

router.use('/user', apiUsersRouter);
router.use(authorizeMiddleware);

module.exports = router;
