let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let flash = require('express-flash');
let session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let regNumber = require('./regNUmbers');
// let Routes = require('./routes')
let app = express();

app.use(session({
  secret: 'This line is to display an error message',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
//----------FOR SENDING DATA AS A FORM TO THE SERVER!!! -------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
//for public folder #Static_Resource!!!
app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'links'
}));
app.set('view engine', 'handlebars');
let useSSL = false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/reg_numbers";

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

let regNumberInstance = regNumber(pool);

app.get('/', async function(req, res, next) {
  try {
    // let displayRegs = await regNumberInstance.regMap();
    res.render('reg', {
      regDisplay: await regNumberInstance.regMap()
    });

  } catch (err) {
    next(err);
  }

});

app.post('/reg_numbers', async function(req, res, next) {
  try {
    let textInput = req.body.text;
    await regNumberInstance.inputReg(textInput);

    if (textInput == "" || textInput == undefined) {
      req.flash("info", "Please insert a valid registration once!");
    }
    res.redirect('/');

  } catch (err) {
    next(err);
  }

});
app.get('/:towns', async function(req, res, next) {
  try {

    let town = req.params.towns;
    // console.log(town);
    res.render('reg', {
      regDisplay: await regNumberInstance.forFiltering(town)
    })

  } catch (err) {
    next(err);
  }
});

app.get('/reg_numbers/reset', async function(req, res, next) {
  try {
    await regNumberInstance.reset();
    res.redirect('/');

  } catch (err) {
    next(err);
  }

});

let PORT = process.env.PORT || 3030;
app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
