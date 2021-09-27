// Controllers du Stuff

// import modele uniquement dans controllers
const fs = require('fs'); // fs permet delete img local pendant suppression objet
const Sauce = require('../models/sauce');

// Les Controllers ------------------------------------------------------------------------------------

// Post 1 - OK
exports.createSauce = async (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // thing ou sauce ? 
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject, 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // url img local
    // initialise like et dislikes à 0
    likes : 0, 
    dislikes : 0,
    // initialise les tableaux 
    usersLiked : [],
    usersDisliked : [],
  }); 
  await sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// POST Like - OK

// ----------------------------- DEBUT CODE LIKE ICI ------------------------------------------------------

exports.likeStatus = async (req, res, next) => {

const likeValue = req.body.like; 
const userID = req.body.userId;
const SauceID = req.params.id; 

try {
  const sauce = await Sauce.findOne({ _id : SauceID }) // juste un bug sur le compteur 
  switch (likeValue) {
    
    // Like
    case 1: 
      if (!sauce.usersLiked.includes(userID) ) {
        await Sauce.updateOne(
          { _id: SauceID }, 
          { $push: { usersLiked : userID }, $inc: { likes : 1 } }
        )
        res.status(200).json( {message : "Like !"}); 
        break;
      }
    
      // Dislike
      case -1: 
      if (!sauce.usersDisliked.includes(userID) ) {
        await Sauce.updateOne(
          { _id: SauceID }, 
          {$push: { usersDisliked : userID }, $inc: { dislikes : 1 } }
        )
        res.status(200).json( {message : "Dislike !"});
        break;
      }

      // Cancel Like
      case 0: 
      if (sauce.usersLiked.includes(userID) ) {
        await Sauce.updateOne(
          { _id: SauceID }, 
          {$pull: { usersLiked : userID }, $inc: { likes : -1 } }
        )
        res.status(200).json( {message : "Cancel Like !"}); 
        break;
      }

      // Cancel Dislike 
      case 0: 
      if (sauce.usersDisliked.includes(userID) ) {
         await Sauce.updateOne(
          { _id: SauceID }, 
          {$pull: { usersDisliked : userID }, $inc: { dislikes : -1 } }
        )
        res.status(200).json( {message : "Cancel Dislike !"}); 
        break;
      }
      default : 
      res.status(400).json( {error : "Une erreur est arrivée !"});

  } // fin switch 
} // fin function - try

catch (error) { res.status(400).json( { error } );}

} // fin middleware

// -----------------------------FIN CODE LIKE ICI ------------------------------------------------------


// Get 1 - OK
exports.getOneSauce = async (req, res, next) => {
  await Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};


// Modify - PUT - sécurisé ++
///*
exports.modifySauce = async (req, res, next) => {

// import de sécurité pour comparé le token
const jwt = require('jsonwebtoken');
const token = req.headers.authorization.split(' ')[1]; // on récupère le token d'auth de connection
const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Verify Token récup / stocké
const userId = decodedToken.userId; // on récup userId de la requette mais décodé

// const sauce
const sauce =   await Sauce.findOne({_id: req.params.id});

// Objet introuvable
if (!sauce) {
  res.status(404).json({ message: 'Objet introuvable !'});
  return;
}

// Modification non autorisé = L'utilisateur PUT n'est pas celui qui a POST 
if (req.body.userId !== userId) { // si on change !== en == on voit que l'action est non autorisé
  res.status(403).json({ message: 'Action non autorisée !'});
  return;  
}

// Code de modification de l'objet
const sauceObject = req.file 
  ? {
    ...JSON.parse(req.body.sauce), 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } 
  : { ...req.body };

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));

};


// Delete 1 - OK - supprime correctement le fichier ?
exports.deleteSauce = async (req, res, next) => {

// import de sécurité pour comparé le token
const jwt = require('jsonwebtoken');
const token = req.headers.authorization.split(' ')[1]; // on récupère le token d'auth de connection
const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Verify Token récup / stocké
const userId = decodedToken.userId; // on récup userId de la requette mais décodé

// const sauce
const sauce =  await Sauce.findOne({_id: req.params.id});

// Objet introuvable
if (!sauce) {
  res.status(404).json({ message: 'Objet introuvable !'});
  return;
}

// Delete autorisé = L'utilisateur DELETE est celui qui a POST 
if (req.body.userId == userId) { // si on change == en !== on voit que l'action est non autorisé
  res.status(403).json({ message: 'Action non autorisée !'});
  return;  
}

// Code de supression de l'objet
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        
    Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));

};





// Get ALL - OK
exports.getAllSauces = async (req, res, next) => {

  await Sauce.find()
  .then((sauces) => {res.status(200).json(sauces);})
  .catch((error) => {res.status(400).json({error: error});});
};



// ----------------------------------------------------------------------------------------------------------------

// Pour tester la sécurité back end du modify ou delete : 
/*
1 - Enlever le middleware auth de 3 routes = (get ALL / get 1 / put 1)
2 - Essayer une requette PUT via Postman pour modifier l'objet 
3 - La requette sera envoyé sans le middleware sécurisé car elle ne vérifie pas 
si la requette viens du même userId que celui qui a post la sauce
*/

// Code modify non sécurisé
/*
exports.modifySauce = (req, res, next) => {

  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));

};
*/

