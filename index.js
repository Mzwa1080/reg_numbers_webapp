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
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//for public folder #Static_Resource!!!
app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({defaultLayout: 'links'}));
app.set('view engine', 'handlebars');

let regNumberInstance = regNumber();

app.get('/', async function(req, res){
    // displayRegs:regNumberInstance.forRegMap();

  res.render('reg');
});

app.post('/reg_numbers', async function(req, res){
  try {
    let textInput = req.body.text;
    let dropDownCheck = req.body.dropdown;

    if(textInput === "" || textInput === undefined){
      req.flash("info", "Please enter a registration number!");
    }
    else{
      let typedText = textInput.substring(0,3).trim();
      let result = await pool.query('select * from towns where town_name=$1', [typedText]);

      if(result.rows.length !== 0){
        await pool.query('insert into reg_numbers (towns_id,reg_numbers) values($1,$2)', [result.rows[0].id,typedText] );
      }

    }

  } catch (err) {

  }

    // let displayRegs =regNumberInstance.inputReg(textInput);
    // let dropdown = regNumberInstance.forFiltering(dropDownCheck);

  res.render('reg');
});

app.get('/:towns', async function(req, res){
    let town = req.params.towns;
    // console.log(town);
    res.render('reg')
})

app.get('/reset', function(req, res){
  regNumberInstance.reset()
  console.log(regNumberInstance.reset()
);
  res.redirect('/');
})
let PORT = process.env.PORT || 3099;
app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
