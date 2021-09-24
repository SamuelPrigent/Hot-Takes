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
  
// Notes 
/*
_id : Object Id = jamais le même d'ou ça vient ?
userId : toujours le même
like = 1 / 0 ou -1

-> Il faudrait rajouter le name de la sauce auquel le like s'applique / comment récup le nom ?

*/



// thingLike.plugin(uniqueValidator); // application du module avant de faire le modele
module.exports = mongoose.model('saucesLikes', thingLike); 

