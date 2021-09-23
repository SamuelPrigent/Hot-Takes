// App

// Import module npm
const express = require("express"); // importe express 
const path = require('path'); // importe path des images

// Import des routes
const stuffRoutes = require ("./routes/sauce")
const userRoutes = require('./routes/user');

// Avant utilisation de app qui utilisera express à chaque fois
  const app = express();

// définis un header à nos réponses pour éviter les erreurs de sécurité type CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // définis par * = tout le monde peut accéder à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); // express remplace bodyParser 

// Aller chercher l'image
app.use('/images', express.static(path.join(__dirname, 'images'))); // donne accès à des img static (local)

// Début URL des ≠ routes
app.use("/api/sauces", stuffRoutes); 
app.use('/api/auth', userRoutes); 

// export du code
module.exports = app; // pour y accéder depuis les autres fichiers du projet ex : node











