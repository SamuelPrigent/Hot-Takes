// Controllers du Stuff

// import du Thing uniquement dans controllers
const Thing = require('../models/thing');
const fs = require('fs'); // import pour delete un objet et delete des fichiers locaux

// Les Controllers ------------------------------------------------------------------------------------

// Post 1 - with img support
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing); //  transforme en objet la chaine de caractère 
  delete thingObject._id; 
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // l'url est personnalisé
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Get 1
exports.getOneThing = async (req, res, next) => {
    
  await Thing.findOne({_id: req.params.id})
  .then((thing) => {res.status(200).json(thing);})
  .catch((error) => {res.status(404).json({error: error});});
  
};

// Modify 1 - Put
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Delete 1 
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Get ALL 
exports.getAllStuff = async (req, res, next) => {

  await Thing.find()
  .then((things) => {res.status(200).json(things);})
  .catch((error) => {res.status(400).json({error: error});});

/*
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: '1er objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: '2eme objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];

  res.status(200).json(stuff);
*/
};







// ----------------------------------------------------------------------------------------------------------------

/* 1ère versions des requetes sans mudler 

// Post 1
exports.createThing = async (req, res, next) => {
    
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  await thing.save()
  .then(() => {res.status(201).json({message: 'Post saved successfully!'});})
  .catch((error) => {res.status(500).json({error: error});});
  
};

// Modify 1
exports.modifyThing = async (req, res, next) => {
    
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  await Thing.updateOne({_id: req.params.id}, thing)
  .then(() => {res.status(201).json({message: 'Thing updated successfully!'});})
  .catch((error) => {res.status(400).json({error: error});});
};

// Delete 1
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


*/