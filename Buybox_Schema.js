const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require("./helper");

var BuyboxSchema = new Schema({
    userid:Schema.Types.ObjectId,
    products:Array
});

var Buybox = mongoose.model('Buybox', BuyboxSchema);

exports.Buybox = Buybox;
