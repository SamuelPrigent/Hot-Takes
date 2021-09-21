require('dotenv').config(); // confidentialité de mon password

// Server.js
// éxécuté lorsque l'on lance = "node server"
// serveur va écouter attendre requette http et y répondre

// ------------------------------------------------------
// Import
const mongoose = require('mongoose'); 

// Connexion
mongoose.connect(process.env.MongoURL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie ! (server)'))
  .catch(() => console.log('Connexion à MongoDB échouée ! (server)'));
  
// ------------------------------------------------------

const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000'); // ligne du port
// normalizePort permet de toujours avoir un port valide (chaine caractère ou nombre)
app.set('port', port);

// errorHandler recherche les erreurs et les gère 
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

// ecoute les évênement et nous indique dans la console sur quel port ils sont écouté
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);





// Ancien code 

/* à la place de app dans create server 
= requete into réponse mais directement via le fichiers app 
(req, res) => {
res.end("voici la reponse du serveur");
} */
// désormais express répond cannot get (error 404) car désormais plus rien de répond


// Ancienne versions serveur simple
/*

const http = require("http"); // object http qui permet de créer un serveur derrière
const app = require("./app"); // permet d'importer express via app
app.set ("port", process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);  // a partir d'ici les réponse seront dans le navigateur ≠ console 

*/