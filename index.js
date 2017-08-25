var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();

app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')))

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

var dbUrl = 'mongodb://localhost:27017/socios';

app.get('/', function (req, res) {
  res.render('formulario');
});

app.post('/grabar-socio', function (req, res) {
  let socio = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fechanacimiento: req.body.fechanacimiento,
    region: req.body.region,
    categoria: req.body.categoria,
    hajugado: req.body.hajugado,
  };

  console.log(JSON.stringify(socio));

  mongodb.connect(dbUrl, function (err, db){
    db.collection('socios').insert(socio);
  });

  res.render('grabar-socio');
})

app.get('/listado', function (req, res) {
  mongodb.connect(dbUrl, function (err, db) {
    db.collection('socios').find().toArray(function (err, docs) {
      socios = docs;
      res.render('listado', socios);
    });
  });
});

app.listen(3000, function (){
  console.log('Servidor MongoDB corriendo en puerto 3000')
})
