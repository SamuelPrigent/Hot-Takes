// Modele User  
// Sécurité -> vérifier que les mails sont uniques

// Import
const mongoose = require('mongoose'); // besoins de mongoose // pour le modele & un module 
const uniqueValidator = require('mongoose-unique-validator'); // permet utilisation de unique pour les emails

const userSchema = mongoose.Schema({ // Schéma de données
  email: { type: String, required: true, unique: true }, // unique vérifie que l'adresse email n'éxiste pas déjà 
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // application du module avant de faire le modele
module.exports = mongoose.model('User', userSchema); // export modele



