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

// POST Like - compter s'affiche à 1 mais ne s'enregistre pas et le tableau ne se met pas à jour
/*
exports.likeStatus = async (req, res, next) => {
  const userLike = new likeSauce({
    like: req.body.like,
    userId: req.body.userId,
  })

    await userLike.save()
    .then(() => res.status(201).json({ message: 'Avis sauce reçu !'}))
    .catch(error => res.status(400).json({ error }));
};
*/

// -----------------------------CODE LIKE ICI ------------------------------------------------------

///*
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
          {$push: { usersLiked : userID }}, 
          {$inc: { likes : 1 }}
        )
        res.status(200).json( {message : "Like !"}); 
        break;
      }
    
      // Dislike
      case -1: 
      if (!sauce.usersDisliked.includes(userID) ) {
        await Sauce.updateOne(
          { _id: SauceID }, 
          {$push: { usersDisliked : userID }}, 
          {$inc: { dislikes : 1 }}
        )
        res.status(200).json( {message : "Dislike !"});
        break;
      }

      // Cancel Like
      case 0: 
      if (sauce.usersLiked.includes(userID) ) {
        await Sauce.updateOne(
          { _id: SauceID }, 
          {$pull: { usersLiked : userID }}, 
          {$inc: { likes : -1 }}
        )
        res.status(200).json( {message : "Cancel Like !"}); 
        break;
      }

      // Cancel Dislike 
      case 0: 
      if (sauce.usersDisliked.includes(userID) ) {
         await Sauce.updateOne(
          { _id: SauceID }, 
          {$pull: { usersDisliked : userID }}, 
          {$inc: { dislikes : -1 }}
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




// -----------------------------CODE LIKE ICI ------------------------------------------------------





// Get 1 - OK
exports.getOneSauce = async (req, res, next) => {
  await Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};

// Modify 1 - Put - OK
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

// Delete 1 - OK - supprime correctement le fichier ?
exports.deleteSauce = (req, res, next) => {
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





