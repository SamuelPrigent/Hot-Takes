// Controller User 
// Hash password & sécurité ?

// Import 
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken'); // permet de vérifier le token à chaque requette

// middleware controller 

// Inscription
exports.signup = async (req, res, next) => { // pas de async ici sinon bug ?
     await bcrypt.hash(req.body.password, 10) // hash du password
      .then(hash => {
        const user = new User({ // nouvel utilisateur créé
          email: req.body.email,
          password: hash // mdp hashé 
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Connection
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Find 1 - object correspondant au mail
      .then(user => {
        if (!user) {return res.status(401).json({ error: 'Utilisateur non trouvé !' });} // pas de compte
        bcrypt.compare(req.body.password, user.password) // Compare hash password stocké vs entrée
          .then(valid => {
            if (!valid) {return res.status(401).json({ error: 'Mot de passe incorrect !' });}
            // Renvoie le Token d'accès si bolleen de comparaison valide
            // Token = sécurité moderne permettant vérifier toutes les requettes passés
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( // function du module 
                { userId: user._id }, // encore userId pour sécurité l'accès à la modif des obj
                'RANDOM_TOKEN_SECRET', 
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };












  /* Code sans vérification de chaque actions // sans jsonwebtoken

  exports.login = async (req, res, next) => {
    await User.findOne({ email: req.body.email }) 
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); 
        }
        bcrypt.compare(req.body.password, user.password) 
          .then(valid => { 
            if (!valid) {return res.status(401).json({ error: 'Mot de passe incorrect !' });}
            // Renvoie le Token d'accès si bolleen de comparaison valide
            res.status(200).json({ 
              userId: user._id,
              token: 'TOKEN'
            });
            // L'auth par Token est une sécurité moderne permettant de vérifier ce token sur plusieurs actions
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  */