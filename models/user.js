var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema ({
    username: {
        type:String
    }
});

schema.plugin(passportLocalMongoose);

module.exports= mongoose.model('User', schema)