var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var restFs = require('./routes/restFs');
var app = express();

function enableCORS(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var rootPath = path.normalize(__dirname );

console.log('rootPath' + rootPath);
app.use(express.static(rootPath + '/app'));

app.use(enableCORS);
app.use(express.static(path.join(rootPath, '/data'),{extensions:['json']}));


restFs(app);

app.listen(8005);

console.log('Listening for NikharApp on port 8005....');