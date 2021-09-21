// Multer config 

const multer = require('multer'); //Import 

// supporte 3 type de fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // remplace espace par _
    const extension = MIME_TYPES[file.mimetype]; // définis l'extenssion du fichier
    callback(null, name + Date.now() + '.' + extension); // return le nom.jpg (nom unique car date)
  }
});

module.exports = multer({storage: storage}).single('image'); // single car fichier unique (+image)

// Il faut modifier le format de la requettes qui contiennent ces images

