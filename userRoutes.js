const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Get all users (protected, example)
router.get('/', userController.protectRoutes, userController.getAllUsers);

// Add book to favorites (protected)
router.post('/fav', userController.protectRoutes, userController.addBookToFav);

module.exports = router;