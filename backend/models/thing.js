// JS Base de donnés MongoDB

const mongoose = require("mongoose");
// const { stringify } = require("querystring");

// ---------------------------------------------------------------------------------------------------------------------

// Schéma d'une sauce

const thingSchema = mongoose.Schema({
// id automatiquement généré
  userId: { type: String, required: true }, // user qui post
  name: { type: String, required: true }, // nom sauce
  manufacturer: { type: String, required: true }, // créateur sauce
  description: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true }, // ingrédient
  heat: { type: Number, required: true }  // niveau de piquant
// Les champs sont obligatoire pour la création d'objet
});

/* 
Note objet :
 

*/


// permet d'exporter le schéma et de le rendre exploitable par MongoDB
module.exports = mongoose.model('Thing', thingSchema);

