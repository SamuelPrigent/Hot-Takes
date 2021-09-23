// Route Stuff de l'application

// Création du router via express
const express = require('express');
const router = express.Router(); 

// Module middleware
const auth = require('../middleware/auth'); // sécurité auth
const multer = require('../middleware/multer-config'); // module gestion d'import d'img chargé POST
// Import Controllers
const stuffCtrl = require("../controllers/stuff") // Import Controller

// Routes ici (importé ensuite dans l'app)  --------------------------------------------------------------------------------------------------
// Auth peu être appliqué à toute les routes car même si pas d'userId à comparer cela n'invalidera pas 

// No need Auth - on peut voir les obj si l'on est pas connecté
router.get('/', auth, stuffCtrl.getAllSauces); // Get ALL
router.get('/:id', auth, stuffCtrl.getOneSauce); // Get 1

// Need Auth
router.post('/', auth, multer, stuffCtrl.createSauce); // Post 1 


router.put('/:id', auth, multer, stuffCtrl.modifySauce); // modify 1 
router.delete('/:id', auth, stuffCtrl.deleteSauce); // Delete 1 

// Nouvelle route post Like ?


// fin de code
module.exports = router;





