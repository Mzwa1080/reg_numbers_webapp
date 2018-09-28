let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let flash = require('express-flash');
let session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let RegNumber = require('./public/js/regNUmbers.js');
let Routes = require('./routes/routes.js');
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

let RegNumberInstance = RegNumber(pool);
let MyExistingRoutes = Routes(RegNumberInstance);

app.get('/', MyExistingRoutes.home);

app.post('/reg_numbers', MyExistingRoutes.regNumberSetup);
app.get('/:towns', MyExistingRoutes.filter);

app.get('/reg_numbers/reset', MyExistingRoutes.resetBtn);

let PORT = process.env.PORT || 3080;
app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
