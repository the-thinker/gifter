const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require("./helper");

var UserhistorySchema = new Schema({
    userid:Schema.Types.ObjectId,
    elements:Array
});

var Userhistory = mongoose.model('Userhistory', UserhistorySchema);

exports.Userhistory = Userhistory;
