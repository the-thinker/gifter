const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ejs = require('ejs');
const language = require("./language.js");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');

const helper = require("./helper");


var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/gifter', { useMongoClient: true })
.then(function()  {
  console.log('connected');
})
.catch(console.error);

autoIncrement.initialize(mongoose.connection);

app.set('view engine', 'ejs');
app.use(cookieParser());

var UserSchema = require("./User_Schema.js");
var User = UserSchema.User;

var BuyboxSchema = require("./Buybox_Schema.js");
var Buybox = BuyboxSchema.Buybox;

var UserhistorySchema = require("./Userhistory_Schema.js");
var Userhistory = UserhistorySchema.Userhistory;

var WhishlistSchema = require("./Whishlist_Schema.js");
var Whishlist = WhishlistSchema.Whishlist;

var ProductSchema = require("./Product_Schema.js");
var Product = ProductSchema.Product;

var BrandSchema = require("./Brand_Schema.js");
var Brand = BrandSchema.Brand;

var ShopSchema = require("./Shop_Schema.js");
var Shop = ShopSchema.Shop;

var Static_Data = require("./static_data.js").Static_Data;
var static_data;

Static_Data.findOne({},function(err,data){
    if(err){
        console.log(err);
    } else if(data != undefined){
        static_data = data;
    }
});

// var newUser = new UserSchema.User({
// 				  name: "Tigran",
//                   surename: "Tadevosyan",
// 				  email:  "edwardassassin357@gmail.com",
// 				  password: "abc123",
//                   sex: "1"
// 		  	});
// 	  	newUser.save(function(err,user){
//             //console.log("asd");
// 	  		if(err){
// 	  			console.log(err);
// 	  		}
// 	  	});

// var newBrand = new BrandSchema.Brand({
// 				  name: "dior",
//                   products:["#414888","#345453","#721843"]
// 		  	});
// 	  	newBrand.save(function(err,user){
//             //console.log("asd");
// 	  		if(err){
// 	  			console.log(err);
// 	  		}
// 	  	});

// var newShop = new Shop({
// 				  name: "egoiste",
//                   products:["#123776","#654772","#414888","#909744","#345453","#721843"],
//                   location:["16 Martiros Saryan St"]
// 		  	});
// 	  	newShop.save(function(err,user){
//             //console.log("asd");
// 	  		if(err){
// 	  			console.log(err);
// 	  		}
// 	  	});

// var newProduct = new Product({
//                 title1: "MARNI",
//                 title2:"Gold and silver-tone leather necklace",
//                 images:["917004.jpg","9170041.jpg","9170044.jpg"],
//                 category:2,
//                 price:292,
//                 old_price:0,
//                 currency:'£',
//                 review_result: {
//                     count:0,
//                     avarage:0
//                 },
//                 availible:  true,
//                 product_code: "#917004",
//                 tags: ["Jewelery","Made in Italy"],
//                 description: "Marni's jewelry collections always blur the line between fashion and art. The perfect example, this gold and silver-tone necklace has a flower pendant with petals cut from red and brown leather. You'll love how it instantly enlivens even a basic T-shirt.",
//                 videos: [],
//                 size: undefined,
//                 specs: ["Drop 14.5cm"],
//                 delivery_returns: "",
//                 reviews: [],
//                 related_products: []
// 		  	});
// newProduct.save(function(err,product){
//     //console.log("asd");
// 	if(err){
// 		console.log(err);
// 	}
// });

/*var dir = './www/images/products/'+'#123776';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}*/

// var newProduct = new Product({
//                 title1: "DIOR EYEWEAR",
//                 title2:"'Umbrage' sunglasses",
//                 images:["8290631.jpg","8290633.jpg","8290635.jpg"],
//                 category:"sunglass",
//                 price:552,
//                 old_price:0,
//                 currency:'$',
//                 review_result: {
//                     count:0,
//                     avarage:0
//                 },
//                 availible:  true,
//                 product_code: "#721843",
//                 tags: ["Sunglasses","Burgundy Tint Lens"],
//                 description: "Tortoise shell brown and silver-tone acetate and metal 'Umbrage' sunglasses from Dior Eyewear featuring round frames, a logo at the temple, straight arms with angled tips and green and black leaf print lenses. This item is unisex. This item comes with a protective case.",
//                 videos: [],
//                 size: undefined,
//                 specs: ["Glass Fiber 100%","asdasv asdasc","1234 asd gfg"],
//                 delivery_returns: "",
//                 reviews: [],
//                 related_products: []
// 		  	});
// newProduct.save(function(err,product){
//     //console.log("asd");
// 	if(err){
// 		console.log(err);
// 	}
// });





server.listen(80, function () {
  console.log('Example app listening on port 80!')
});

app.get('/', function (req, res) {
    //console.log(req.connection.remoteAddress);
    //console.log(req.headers['x-forwarded-for']);
    var _language = (language[req.cookies.language] ? language[req.cookies.language] : language["eng"]);
    var get_bestsellers = new Array();
    //console.log(static_data);
    //console.log(Static_Data);
    Product.find({product_code:{ $in: static_data.bestsellers }},function(err,products){
        //console.log(products);
        products.forEach(function(product){
            get_bestsellers.push({
                title:product.title1,
                productCode: product.product_code.slice(1),
                Price:product.currency+product.price,
                image:["square_"+product.images[0],"square_"+product.images[1]],
                category:helper.jsUcfirst(_language.category[product.category])
            });
        });
        if( products.length == 1 ){
            for(var ii = 0; ii < 24; ++ii){
                get_bestsellers[ii]={
                    title:products[0].title1,
                    productCode: products[0].product_code.slice(1),
                    Price:products[0].currency+products[0].price,
                    image:["square_"+products[0].images[0],"square_"+products[0].images[1]],
                    category:helper.jsUcfirst(_language.category[products[0].category])
                };
            }
        }
        User.findOne({_id:req.cookies._vcc},function(err,user){
            if(user != undefined){
                res.render('pages/index.ejs',{
                    language:_language,
                    main:"../pages/home",
                    bestsellers:get_bestsellers,
                    name:user.name,
                    surename:user.surename,
                    email:  user.email,
                    sex:user.sex,
                    logged:true
                });
            } else {
                res.render('pages/index.ejs',{
                    language:_language,
                    bestsellers:get_bestsellers,
                    main:"../pages/home",
                    logged:false
                });
            }
        });
    });
});


app.get('/product/:productCode', function (req, res) {
    Product.findOne({product_code:'#'+req.params.productCode},function(err,product){
        if(err){
            console.log(err);
        } else if(product != undefined) {
            var _language = (language[req.cookies.language] ? language[req.cookies.language] : language["eng"]);
            //var _product = ;
            User.findOne({_id:req.cookies._vcc},function(err,user){
                if(user != undefined){
                    res.render('pages/index.ejs',{
                        language:_language,
                        main:"../pages/productunit",
                        product:{
                            title1: product.title1,
                            title2: product.title2,
                            images: product.images,
                            category: helper.jsUcfirst(_language.category[product.category]),
                            review_result: product.review_result,
                            price:product.price,
                            old_price:product.old_price,
                            currency:product.currency,
                            availible:  product.availible,
                            product_code: product.product_code,
                            productCode: product.product_code.slice(1),
                            tags: product.tags,
                            description: product.description,
                            videos: product.videos,
                            size: product.size,
                            specs: product.specs,
                            delivery_returns: product.delivery_returns,
                            reviews: product.reviews,
                            related_products: product.related_products,
                            options: product.options
                        },
                        name:user.name,
                        surename:user.surename,
                        email:  user.email,
                        sex:user.sex,
                        logged:true
                    });
                } else {
                    res.render('pages/index.ejs',{
                        language:_language,
                        main:"../pages/productunit",
                        product:{
                            title1: product.title1,
                            title2: product.title2,
                            images: product.images,
                            category: helper.jsUcfirst(_language.category[product.category]),
                            review_result: product.review_result,
                            price:product.price,
                            old_price:product.old_price,
                            currency:product.currency,
                            availible:  product.availible,
                            product_code: product.product_code,
                            productCode: product.product_code.slice(1),
                            tags: product.tags,
                            description: product.description,
                            videos: product.videos,
                            size: product.size,
                            specs: product.specs,
                            delivery_returns: product.delivery_returns,
                            reviews: product.reviews,
                            related_products: product.related_products,
                            options: product.options
                        },
                        logged:false
                    });
                }
            });
            //res.send(product.title1);
        } else {
            res.send("Product doe's not exist");
        }
    });
});

app.get('/search/:line', function (req, res) {
    var line = req.params.line.split("~");
    var result = [];
    var category = [];
    var brand = [];
    var _regex = [];
    var regexp_query = [];
    line.forEach(function(str){
        for(var prop in language) {
            for(var ii = 0; ii < language[prop].category.length; ++ii){
                if (language[prop].category[ii] == str.toLowerCase()) {
                    category.push(ii);
                    line.splice(line.indexOf(str), 1);
                }
            }
        };
    });
    //Brand.find({},function(err,brands){
        // line.forEach(function(str){
        //     for(var ii = 0; ii < brands.length; ++ii){
        //         if (brands[ii].name == str.toLowerCase()) {
        //             brand.push(brands[ii].name);
        //             line.splice(line.indexOf(str), 1);
        //         }
        //     }
        // });

        line.forEach(function(str){
            _regex.push(".*"+str+".*");
            regexp_query.push(new RegExp(str,"i"));
        });

        Product.find({ $or: [
                { title1: {$in: regexp_query } },
                { title2: {$in: regexp_query } },
                { description: {$in: regexp_query } },
                { category:{ $in: category } }
            ]
        }).exec(function(err,products){
            User.findOne({_id:req.cookies._vcc},function(err,user){
                var _language = (language[req.cookies.language] ? language[req.cookies.language] : language["eng"]);
                var res_products = [];
                products.forEach(function(product){
                    res_products.push({
                        title:product.title1,
                        productCode: product.product_code.slice(1),
                        Price:product.currency+product.price,
                        image:["square_"+product.images[0],"square_"+product.images[1]],
                        category:helper.jsUcfirst(_language.category[product.category])
                    });
                });
                if(user != undefined){
                    res.render('pages/index.ejs',{
                        language:_language,
                        main:"../pages/productline",
                        products:res_products,
                        name:user.name,
                        surename:user.surename,
                        email:  user.email,
                        sex:user.sex,
                        logged:true
                    });
                } else {
                    res.render('pages/index.ejs',{
                        language:_language,
                        main:"../pages/productline",
                        products:res_products,
                        logged:false
                    });
                }
            });
        });
    //});
});

app.use(express.static('www'));


io.on('connection', function (socket) {
    socket.on("register",function(data){
        User.findOne({email:data.email},function(err,user){
            if(err){
                console.log(err);
                return 0;
            }
            if(user == undefined){
                var newUser = new User({
                				  name: data.name,
                                  surename: data.surename,
                				  email:  data.email,
                				  password: data.password,
                                  sex: data.sex
                		  	});
        	  	newUser.save(function(err,user){
        	  		if(err){
        	  			console.log(err);
        	  		} else {
                        var newBuybox = new Buybox({
                                        userid:user._id,
                                        products:[]
                        		  	});
                	  	newBuybox.save();
                        var newWhishlist = new Whishlist({
                                        userid:user._id,
                                        products:[]
                        		  	});
                	  	newWhishlist.save();
                        var newUserhistory = new Userhistory({
                                        userid:user._id,
                                        element:[]
                        		  	});
                	  	newUserhistory.save();

                        socket.emit("register_success",{_vcc:user._id});
                    }});

            } else {
                socket.emit("register_email_exist");
            }
        });
    });
    socket.on("settings",function(data){
        User.findOne({_id:data._vcc},function(err,user){
            if(err){
                console.log(err);
                return 0;
            }
            if(user != undefined){
                user.name=data.name;
                user.surename=data.surename;
                user.email=data.email;
                if(data.password != undefined && data.password != ""){
                    user.password = data.password;
                }
                user.save(function(err,user){
        	  		if(err){
        	  			console.log(err);
        	  		} else {
                        socket.emit("settings_approved");
                    }
                });
            }
        });
    });
    socket.on("login",function(data){
        User.findOne({email:data.email},function(err,user){
            if(err){
                console.log(err);
                return 0;
            }
            if(user == undefined){
                socket.emit("login_wrong");
                return 0;
            }
            if(bcrypt.compareSync(data.password, user.password)) {
                socket.emit("login_success",user._id);
            } else {
                socket.emit("login_wrong");
            }
        });
    });
    socket.on("addtobag",function(data){
        User.findOne({_id:data._vcc},function(err,user){
            if(err){
                console.log(err);
                return 0;
            }
            if(user == undefined){
                //socket.emit("login_wrong");
                return 0;
            }
            Product.findOne({product_code:data.code},function(err,product){
                if(err){
                    console.log(err);
                    return 0;
                }
                if(product != undefined){
                    Buybox.findOne({userid:user._id},function(err,buybox){
                        if(err){
                            console.log(err);
                            return 0;
                        }
                        buybox.products.push({
                            product_code:product.product_code,
                            options:"default"
                        });
                        product.sold++;
                        product.save();
                        buybox.save(function(){
                            socket.emit("addedtobag");
                        });
                    });
                }
            });
        });
    });
    socket.on("getbuybox",function(_id){
        Buybox.findOne({userid:_id},function(err,buybox){
            if(err){
                console.log(err);
                return 0;
            }
            var temp_product_info = [];
            var product_codes = [];
            buybox.products.forEach(function(product){
                product_codes.push(product.product_code);
            });
            Product.find({product_code:{$in:product_codes}}).limit(6).exec(function(err,products){
                if(err){
                    console.log(err);
                    return 0;
                }
                products.forEach(function(product){
                    if(product.title1.length>10){
                        product.title1 = product.title1.slice(0,9)+"...";
                    }
                    temp_product_info.push({
                        image:product.images[0],
                        title1:product.title1,
                        code:product.product_code.slice(1)
                    });
                });
                socket.emit("gotbuybox",temp_product_info);
            });
            //socket.emit("gotbuybox",buybox);
        });
    });
});
