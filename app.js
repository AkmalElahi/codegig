const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path');


const db = require('./config/database');

// TEST DB CONNECTION
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

const app = express();

// HANDLEBARS

app.engine('handlebars', engine({ defaultLayouts: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');


//BODY PARSER

app.use(bodyParser.urlencoded({ extended: false }));

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { layout: 'landing' });
});



// GIG ROUTES

app.use('/gigs', require('./routes/gigs'));

const PORT = 3000;


app.listen(PORT, console.log(`Server is started on post ${PORT}`));
