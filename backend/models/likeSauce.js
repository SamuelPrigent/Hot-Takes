// JS Base de donnés MongoDB
// const { stringify } = require("querystring");

const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator'); // permet utilisation de unique pour les emails


// ---------------------------------------------------------------------------------------------------------------------

// Schéma d'une sauce
const likeSauce = mongoose.Schema({
  userId: { type: String, required: true }, 
  like: { type: Number, required: true }, 
});
  
// données de la requête 
/*
_id : Object Id = jamais le même d'ou ça vient ?
hypothèse -> Recup name de la sauce auquel le like s'applique ??

*/


// likeSauce.plugin(uniqueValidator); // application du module avant de faire le modele
module.exports = mongoose.model('saucesLikes', likeSauce); 

// !!
// Avant 
// module.exports = mongoose.model('saucesLikes', likeSauce); 
// Devrait être ?
// module.exports = mongoose.model('sauces', likeSauce); 



