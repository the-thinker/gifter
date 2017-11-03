const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
const uuid = require('node-uuid');
const helper = require("./helper");

var ProductSchema = new Schema({
    id_c:Number,
    id_u:{ type: String, default: uuid.v1() },
    title1: String,
    title2: String,
    price: Number,
    old_price: Number,
    review_result:Object,
    currency: String,
    images:Array,
    category:Number,
    reviews: Object,
    availible:  Boolean,
    product_code: String,
    tags: Array,
    description: String,
    videos: Array,
    size: Array,
    specs: Array,
    delivery_returns: String,
    reviews: Array,
    related_products: Array,
    sold: { type: Number, default: 0 },
    options: Object
});


ProductSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'id_c' });

var Product = mongoose.model('Product', ProductSchema);

exports.Product = Product;
