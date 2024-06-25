require('dotenv').config();//Cette ligne charge les variables d'environnement à partir d'un fichier .env (s'il existe) dans l'environnement de l'application.
//Cela permet d'utiliser des variables sensibles (comme les identifiants de base de données, les clés API, etc.) sans les exposer directement dans le code.

var createError = require('http-errors');//Cette ligne importe le module http-errors, qui fournit des fonctions pour créer des erreurs HTTP standard.
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//Cette ligne importe le middleware cookie-parser, qui sera utilisé pour analyser et manipuler les cookies dans votre application.
var logger = require('morgan');//Cette ligne importe le middleware morgan, qui sera utilisé pour journaliser les requêtes HTTP entrantes dans votre application.

var indexRouter = require('./routes/index');//Cette ligne importe le routeur défini dans le fichier ./routes/index.js. Ce routeur contiendra probablement les routes principales de l'application, comme la page d'accueil, la page "À propos", etc.
var authRouter = require('./routes/auth');//Ce routeur contiendra probablement les routes liées à l'authentification des utilisateurs, comme la connexion, l'inscription, la réinitialisation du mot de passe, etc.

var app = express();

app.locals.pluralize = require('pluralize');//cette ligne de code ajoute une fonction de pluralisation pluralize aux variables locales de l'application Express (app.locals).

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
