var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Diceware = require('./Diceware.model.js');
var port = 8080;
var db = 'mongodb://localhost/test';

mongoose.connect(db);
mongoose.set('debug', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('happy to be here');
});

app.get('/words', function (req, res) {
    console.log('getting all the words');
    Diceware.find({})
        .exec(function (err, words) {
            if (err) {
                res.send('error has ocurred');
            } else {
                console.log(words);
                res.json(words);
            }

        });
});

app.get('/words/:combination', function (req, res) {
    console.log('getting one word');
    Diceware.findOne({
        combination: req.params.combination
    })
        .exec(function (err, word) {
            if (err) {
                res.send('error ocurred')
            } else {
                res.json(word);
            }
        })
});

app.listen(port, function () {
    console.log('app listening on port ' + port)
});