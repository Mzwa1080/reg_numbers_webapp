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

app.get('/', function(req, res){
  // displayRegs:regNumberInstance.forRegMap();

  res.render('reg', {displayRegs:regNumberInstance.forRegMap()});
});

app.post('/reg_numbers', function(req, res){
    let textInput = req.body.text;
    let dropDownCheck = req.body.dropdown;

    let displayRegs =regNumberInstance.inputReg(textInput);
    let dropdown = regNumberInstance.forFiltering(dropDownCheck);

  res.render('reg', {displayRegs,dropdown}) });

app.get('/:towns', function(req, res){
    let town = req.params.towns;
    // console.log(town);	    // console.log(town);
    res.render('reg', {displayRegs:regNumberInstance.forFiltering(town)} )
  	})

app.get('/reset', function(req, res){

  // console.log(  regNumberInstance.reset()	);
  res.render('reg', {displayRegs:regNumberInstance.reset()});
})


let PORT = process.env.PORT || 3999;
app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
