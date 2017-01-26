var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    link: {
        type: String,
        validate:{
            validator: function(v){
                var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
                return regex.test(v)    
            },
            message: 'Link supplied is Invalid'
        },
        required: [true, 'Amazon link is missing!']
    },
    title:{
        type: String, 
        required: [true, 'Book title is missing!']
    },
    author: {
        type: String,
        required: [true, 'Author is missing!']
    },
    published: {type: String},
    description: {
        type: String,
        required: [true, 'Description is missing!']
    },
    imageUrl: {
        type: String
    },
    price: {
        type: String,
        required: [true, 'Price is missing']        
    },
    createDate: {type: Date},
    updateDate: {type: Date},
});
module.exports = mongoose.model('Book', schema);

//--expose_debug_as=v8debug