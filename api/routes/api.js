const express = require('express');
const router = express.Router();
const apiUsersRouter = require('./apiUsers');
const authorizeMiddleware = require('../middlewares/authorize');
const apiProjectRouter = require('./apiProjects');

router.use('/user', apiUsersRouter);
router.use(authorizeMiddleware);
router.use('/project', apiProjectRouter);

module.exports = router;
