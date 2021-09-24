// JS Base de donnés MongoDB

const mongoose = require("mongoose");
// const { stringify } = require("querystring");

// ---------------------------------------------------------------------------------------------------------------------

// Schéma d'une sauce
const thingLike = mongoose.Schema({
  userId: { type: String, required: true }, 
  like: { type: Number, required: true }, 
});

// permet d'exporter le schéma et de le rendre exploitable par MongoDB
module.exports = mongoose.model('userLike', thingLike);

