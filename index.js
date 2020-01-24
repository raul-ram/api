const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const helmet = require('helmet');




const db = require('./queries') //consultas 
const app = express()
const port = 3000

// Configurar cabeceras y cors
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8887'); //solo permitira conexiones cruzadas con esta url
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//configuracion para vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Log de fecha de acceso

app.use(function (req, res, next) {
    console.log('Fecha de acceso    : ' + Date.now());
    next();
})

//Rutas

app.get('/', (request, response) => {
    response.json({ info: 'hola esto es nodejs' })
})

app.get('/form', function (req, res) {
    console.log('estamos en index');
    res.render('form')
})

//Rutas de servicios ( consultas)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.get('/users/ci/:ci', db.getUserByCi)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`Aplicación corriendo en puerto: ${port}.`)
})