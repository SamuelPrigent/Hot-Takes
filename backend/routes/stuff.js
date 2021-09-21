// Route Stuff de l'application

// Création du router pour utiliser express
const express = require('express');
const router = express.Router(); // plutôt que app.get ou app.post on aura router.get et router.post

// Imports de middleware
const auth = require('../middleware/auth'); // sécurité auth
const multer = require('../middleware/multer-config'); // module gestion d'import d'img chargé POST
const stuffCtrl = require("../controllers/stuff") // Import Controller

// Routes ici // seront importés dans app  --------------------------------------------------------------------------------------------------
// Auth peu être appliqué à toute les routes car même si pas d'userId à comparer cela n'invalidera pas 

// No need Auth - on peut voir les obj si l'on est pas connecté
router.get('/', stuffCtrl.getAllStuff); // Get ALL
router.get('/:id', stuffCtrl.getOneThing); // Get 1

// Need Auth
router.post('/', auth, multer, stuffCtrl.createThing); // Post 1 + multer ?
router.put('/:id', auth, multer, stuffCtrl.modifyThing); // modify 1 + (multer vérif auteur du post)
router.delete('/:id', auth, stuffCtrl.deleteThing); // Delete 1 + (multer vérif auteur du post)

// fin de code
module.exports = router;





