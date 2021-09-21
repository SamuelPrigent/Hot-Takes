// user route

const express = require('express'); // Import
const router = express.Router(); // utilisation d'express
const userCtrl = require('../controllers/user'); // Import controller

// Middleware // 2 routes post + méthode signup / login (les controllers)
router.post('/signup', userCtrl.signup); // route inscription 
router.post('/login', userCtrl.login); // route connection

// Export
module.exports = router;

