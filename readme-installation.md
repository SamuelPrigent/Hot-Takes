## Dependance installation ??

# If Error

Error in module installation = npm ERR! code ERESOLVE ?
=> solve with downgrading Angular : npm install -g npm@6.14.15
Source : https://stackoverflow.com/questions/67368552/jasmine-core-avoids-installing-angular-devkit-build-angular

# Modules

1 . angular = npm install -g @angular/cli
2 . express = npm install express --save
3 . mongoose = npm install --save mongoose
4 . module mongoose (verify email unique) :
npm install --save mongoose-unique-validator
5 . bcrypt (hashpassword) : npm install --save bcrypt
6 - jsonwebtoken : npm install --save jsonwebtoken (pour auth les requetes)
7 - Multer : permet de charger des images : npm install --save multer
8 - nodemon : npm install --save-dev nodemon
9 - dotenv : npm install dotenv

# Run

# Frontend

npm start
ou
windows = node node_modules/live-server/live-server --port=8081
Linux / et mac = node ./node_modules/.bin/http-server -a localhost -p 8081\

# backend

Server.js (que je vais créer moi même)
nodemon server
