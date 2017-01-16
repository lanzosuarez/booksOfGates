var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    password: {type:String},
    email: {type:String},
});
module.exports = mongoose.model('User', schema);

