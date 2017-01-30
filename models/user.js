var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema ({
    username: {
        type:String,
        validate:{
            validator:function(v){
                var r = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                return r.test(v)
            },
            message: 'Email is invalid!'
        }
    },
    firstname: {
        type:String,
        required:[true, 'Missing firstname'],
        minlength: [2, 'First name is too short'],
        lowercase: true
    },
    lastname: {
        type:String,
        required:[true, 'Missing lastname'],
        minlength: [2, 'Last name is too short'],
        lowercase: true
    }
});

schema.plugin(passportLocalMongoose);

module.exports= mongoose.model('User', schema)