// JS Base de donnés MongoDB

const mongoose = require("mongoose");
// const { stringify } = require("querystring");

// ---------------------------------------------------------------------------------------------------------------------

// Schéma d'une sauce

const thingSchema = mongoose.Schema({
// id automatiquement généré 
  userId: { type: String, required: true }, // utilisateur qui publient la sauce
  name: { type: String, required: true }, // nom de la sauce
  manufacturer: { type: String, required: true }, // fabricant de la sauce
  description: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true }, 
  heat: { type: Number, required: true }, 
  // initialise les 2 compteurs (likes / dislikes)
  likes: { type: Number, required: true }, 
  dislikes: { type: Number, required: true }, 
  // initialise les 2 listes (like / dislike)
  usersLiked: { type: Array, required: true }, 
  usersDisliked: { type: Array, required: true },  
});



// permet d'exporter le schéma et de le rendre exploitable par MongoDB
module.exports = mongoose.model('Thing', thingSchema);

