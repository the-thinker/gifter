const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require("./helper");

var WhishlistSchema = new Schema({
    userid:Schema.Types.ObjectId,
    products:Array
});

var Whishlist = mongoose.model('Whishlist', WhishlistSchema);

exports.Whishlist = Whishlist;
