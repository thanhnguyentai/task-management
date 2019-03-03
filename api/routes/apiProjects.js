
const express = require('express');
const router = express.Router();
const cookieHelper = require('../helpers/cookie');
const projectService = require('../services/projects');

// Get list projects
router.get('/list', function(req, res, next){
  const user = cookieHelper.getAuthenticatedCookie(req);
  
});
// Add a new project
router.post('/create', function(req, res, next) {
});

// Update a project
router.post('/update', function(req, res, next) {
});

// Delete a project
router.post('/delete', function(req, res, next) {
});

// Get all users of a project
router.get('/users', function(req, res, next) {
});

// Add an user to a project
router.post('/add-user', function(req, res, next) {
});

// Change the role of an user
router.post('/change-role', function(req, res, next) {
});

// Remove an user from a project
router.post('/remove-user', function(req, res, next) {
});

module.exports = router;
