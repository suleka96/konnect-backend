const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public'))); //Define where to look for static assets
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //Define view engine as EJS
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

// create application/json parser
var jsonParser = bodyParser.json();

//Index route
app.get('/', (req, res) => res.render('pages/index'));

app.post('/register', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var registerInfo = req.body;
    console.log(registerInfo);
});

