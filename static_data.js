const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require("./helper");

var Static_DataSchema = new Schema({
    bestsellers: Array
});

var Static_Data = mongoose.model('Static_Data', Static_DataSchema);

Static_Data.findOne({},function(err,static_data){
    if(err){
        console.log(err);
    } else if(static_data == undefined){
        var _bestsellers = [];
        for(var ii = 0; ii < 24 ; ++ii){
            _bestsellers[ii] = "#123776";
        };
        var newStatic_Data = new Static_Data({
                        bestsellers:_bestsellers
        		  	});
	  	newStatic_Data.save(function(err,static_data){
	  		if(err){
	  			console.log(err);
	  		}
	  	});
    }
});

exports.Static_Data = Static_Data;
