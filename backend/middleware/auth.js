// Authentifie les actions via token + UserID
// Vérifie Action correspond à : UserId authentifié + UserId X a bien la permissions d'effectuer cette action

// Import
const jwt = require('jsonwebtoken');

// Middleware
module.exports = (req, res, next) => {

  try { // Try car on essaye plusieurs élément dans le bloc try que l'on veut gérer avec le même catch

    const token = req.headers.authorization.split(' ')[1]; // on récupère le token d'auth de connection
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Verify Token récup / stocké
    const userId = decodedToken.userId; // on récup userId de la requette mais décodé
    
    // On check si l'userId correspond à l'userId voulu 
    if (req.body.userId && req.body.userId !== userId) {throw 'Invalid user ID';} 
    else {
      req.userId =  userId
      next();} // si ok next passe au middleware
  } 

  catch {res.status(403).json({error: new Error('Unauthorized request!')});} // 403 ou 401 ?

};




