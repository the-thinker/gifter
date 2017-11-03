const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
const uuid = require('node-uuid');
const helper = require("./helper");
// function randomKey(length) {
//     var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     var result = '';
//     for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//     return result;
// }

var UserSchema = new Schema({
    id_c:Number,
    id_u:{ type: String, default: uuid.v1() },
    name: String,
    surename: String,
    email:  { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    sex: Number
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
         return next()
     };


});

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'id_c' });

var User = mongoose.model('User', UserSchema);

exports.User = User;
