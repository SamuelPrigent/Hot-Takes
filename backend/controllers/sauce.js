// Controllers du Stuff

// import modele uniquement dans controllers
const fs = require('fs'); // fs permet delete img local pendant suppression objet
const Sauce = require('../models/sauce');

const likeSauce = require('../models/likeSauce'); // new likeSauce présent dans ancien code
const sauce = require('../models/sauce');


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
    // initialise les tableaux - mais rien ne rentre dedans ?
    usersLiked : [],
    usersDisliked : [],
  }); 
  await sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// POST Like - compter s'affiche à 1 mais ne s'enregistre pas et le tableau ne se met pas à jour
///*
exports.likeStatus = async (req, res, next) => {
  const userLike = new likeSauce({
    like: req.body.like,
    userId: req.body.userId,
  })

    await userLike.save()
    .then(() => res.status(201).json({ message: 'Avis sauce reçu !'}))
    .catch(error => res.status(400).json({ error }));
};
//*/

// -----------------------------CODE LIKE ICI ------------------------------------------------------

/*
exports.likeStatus = (req, res, next) => {

const likeValue = req.body.like; 
const userID = req.body.userId;

// ??  // const SauceID = req.params.id; // l'utiliser ?
// Je n'utilise plus modèle données qui exporte requete ? : // const userLike = new likeSauce({


    Sauce.findOne({ _id : req.params.id }).then (sauce => {

      // Like
      if (likeValue === 1 && !sauce.usersLiked.includes(userID)) {
        sauce.updateOne( { _id: req.params.id }, {$push: { usersLiked : userID }}, {$inc: { likes : 1 }} );
        sauce.then( () => {res.status(200).json( {message : "Like !"} ) } );
        sauce.catch( (error) => {res.status(500).json( { error: error} ) } );
      };
    
      // Dislike
      if (likeValue === -1 && !sauce.usersDisliked.includes(userID)) {
        sauce.updateOne( { _id: req.params.id }, {$push: { usersDisliked : userID }}, {$inc: { dislikes : 1 }} );
        sauce.then( () => {res.status(200).json( {message : "Dislike !"} ) } );
        sauce.catch( (error) => {res.status(500).json( { error: error} ) } );
      }
  
      // Cancel Like
       if (likeValue === 0 && !sauce.usersLiked.includes(userID)) { 
        sauce.updateOne( { _id: req.params.id }, {$pull: { usersLiked : userID }}, {$inc: { likes : -1 }} );
        sauce.then( () => {res.status(200).json( {message : "Cancel Like !"} ) } );
        sauce.catch( (error) => {res.status(500).json( { error: error} ) } );
      };

      // Cancel Dislike
       if (likeValue === 0 && !sauce.usersDisliked.includes(userID)) { 
        sauce.updateOne( { _id: req.params.id }, {$pull: { usersDisliked : userID }}, {$inc: { dislikes : -1 }} );
        sauce.then( () => {res.status(200).json( {message : "Cancel Dislike !"} ) } );
        sauce.catch( (error) => {res.status(500).json( { error: error} ) } );
        };

    }) 

    .catch(error => res.status(400).json({ error }));

  }
  */
  





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

// hypothèses simple testé qui ne fonctionne pas pour le like

// 1 - delete l'id automatique ?
//const LikeObject = JSON.parse(req.body.sauce); // thing ou sauce ? 
//delete LikeObject._id;
//console.log(req.body.sauce)

// 2 - fetch le nom pour ne pas post à chaque fois ? mais c'est une requete post ??
// const urlParams = new URLSearchParams(window.location.search);
// const idProduct = urlParams.slice(28); 
// fetch = ("http://localhost:3000/api/sauce/idProduct");
// console.log(fetch.name) 


// Anciens code - POST Like - compter s'affiche à 1 mais ne s'enregistre pas et le tableau ne se met pas à jour
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





