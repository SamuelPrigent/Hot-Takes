// Controllers du Stuff

// import modele uniquement dans controllers
const fs = require('fs'); // fs permet delete img local pendant suppression objet
const Sauce = require('../models/sauce');

const likeSauce = require('../models/likeSauce');


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


exports.likeSauce = async (req, res, next) => {
  /*
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject, 
  }); 
  */
// ou

  const userLike = new likeSauce({
    like: req.body.like,
    userId: req.body.userId,
  })

///*
  await userLike.save()
    .then(() => res.status(201).json({ message: 'Avis sauce reçu !'}))
    .catch(error => res.status(400).json({ error }));
};
//*/

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

/* 1ère versions des requetes sans mudler 

// Post 1
exports.createSauce = async (req, res, next) => {
    
  const sauce = new Sauce({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  await sauce.save()
  .then(() => {res.status(201).json({message: 'Post saved successfully!'});})
  .catch((error) => {res.status(500).json({error: error});});
  
};

// Modify 1
exports.modifySauce = async (req, res, next) => {
    
  const sauce = new Sauce({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  await Sauce.updateOne({_id: req.params.id}, sauce)
  .then(() => {res.status(201).json({message: 'Sauce updated successfully!'});})
  .catch((error) => {res.status(400).json({error: error});});
};

// Delete 1
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

*/