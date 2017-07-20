'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Diceware = new Schema({
    combination : String,
    word : String
});

module.exports = mongoose.model('Diceware', Diceware);