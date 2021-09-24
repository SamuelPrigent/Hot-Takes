// Route Stuff de l'application

// Création du router via express
const express = require('express');
const router = express.Router(); 

// Module middleware
const auth = require('../middleware/auth'); // sécurité auth
const multer = require('../middleware/multer-config'); // module gestion d'import d'img chargé POST
// Import Controllers
const sauceCtrl = require("../controllers/sauce") // Import Controller

// Routes ici (importé ensuite dans l'app)  --------------------------------------------------------------------------------------------------
// Auth peu être appliqué à toute les routes car même si pas d'userId à comparer cela n'invalidera pas 

router.get('/', auth, sauceCtrl.getAllSauces); // Get ALL
router.get('/:id', auth, sauceCtrl.getOneSauce); // Get 1

router.post('/', auth, multer, sauceCtrl.createSauce); // Post 1 

router.post('/:id/like', auth, sauceCtrl.likeSauce); // Post - like 

router.put('/:id', auth, multer, sauceCtrl.modifySauce); // modify 1 
router.delete('/:id', auth, sauceCtrl.deleteSauce); // Delete 1 

// Nouvelle route post Like ? modif post 1 ?


// fin de code
module.exports = router;





