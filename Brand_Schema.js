const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require("./helper");

var BrandSchema = new Schema({
    name:String,
    products:Array
});

var Brand = mongoose.model('Brand', BrandSchema);

exports.Brand = Brand;
