
const express = require('express');
const router = express.Router();
const cookieHelper = require('../helpers/cookie');
const projectService = require('../services/projects');

// Get list projects
router.get('/list', function(req, res, next){
  const user = cookieHelper.getAuthenticatedCookie(req);
  
  projectService.getProjectsByUser(user._id)
  .then(projects => {
    res.json(projects);
  }).catch(err => {
    res.json(err);
  });
});

// Add a new project
router.post('/create', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const name = req.body.name;
  const description = req.body.description;
  
  projectService.create(name, description, user._id)
  .then(project => {
    res.json(project);
  }).catch(err => {
    res.json(err);
  });
});

// Update a project
router.post('/update', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const id   = req.body.id;
  const name = req.body.name;
  const description = req.body.description;

  projectService.update(id, name, description, user._id)
  .then(message => {
    res.json(message);
  }).catch(err => {
    res.json(err);
  });
});

// Delete a project
router.post('/delete', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const id   = req.body.id;

  projectService.delete(id, user._id)
  .then(message => {
    res.json(message);
  }).catch(err => {
    res.json(err);
  });
});

// Get all users of a project
router.get('/users', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const id   = req.body.id;
});

// Add an user to a project
router.post('/add-user', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const id   = req.body.id;
  const userId = req.body.user;
  const role = req.body.role;

  projectService.addUser(id, userId, role, user._id)
  .then(message => {
    res.json(message);
  }).catch(err => {
    res.json(err);
  });
});

// Change the role of an user
router.post('/change-role', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const id   = req.body.id;
  const userId = req.body.user;
  const role = req.body.role;

  projectService.changeUserRole(id, userId, role, user._id)
  .then(message => {
    res.json(message);
  }).catch(err => {
    res.json(err);
  });
});

// Remove an user from a project
router.post('/remove-user', function(req, res, next) {
  const user = cookieHelper.getAuthenticatedCookie(req);
  const id   = req.body.id;
  const userId = req.body.user;

  projectService.removeUser(id, userId, user._id)
  .then(message => {
    res.json(message);
  }).catch(err => {
    res.json(err);
  });
});

module.exports = router;
