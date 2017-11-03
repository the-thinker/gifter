const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require("./helper");

var ShopSchema = new Schema({
    name:String,
    products:Array,
    location:Array
});

var Shop = mongoose.model('Shop', ShopSchema);

exports.Shop = Shop;
