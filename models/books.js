var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    link:{type: String},
    title: {type: String},
    author: {type: String},
    published: {type: String},
    description: {type: String},
    imageUrl: {type: String},
    price: {type: String},
    createDate: {type: Date},
    updateDate: {type: Date},
});
module.exports = mongoose.model('Book', schema);