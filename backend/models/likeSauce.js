// JS Base de donnés MongoDB
// const { stringify } = require("querystring");

const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator'); // permet utilisation de unique pour les emails


// ---------------------------------------------------------------------------------------------------------------------

// Schéma d'une sauce
const thingLike = mongoose.Schema({
  userId: { type: String, required: true }, 
  like: { type: Number, required: true }, 
});


// thingLike.plugin(uniqueValidator); // application du module avant de faire le modele
module.exports = mongoose.model('userLike', thingLike);

