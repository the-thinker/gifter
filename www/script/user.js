var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function update_buybox_inteface(products){
    if(products.length == 0){
        $(".user-buybox-div").html('<div class="user-buybox-empty">Buybox is empty!</div>');
    } else{
        var html = "";
        products.forEach(function(product){
            html += '<div class="user-buybox-div-element"><img src="/images/products/' + product.code + '/square_' + product.image + '">' + product.title1 + '</div>';
        });
        html += '<div class="user-buybox-div-element" style="background-color:#000518;color:white;cursor:pointer">Go to Buybox</div>';
        $(".user-buybox-div").html(html);
    }
}

$(".search-bar img").click(function(){
    location.href=location.origin+"/search/"+$(".search-bar input").val().replace(/ /g,"~");
});

$('.search-bar input').keyup(function(e){
    if(e.keyCode == 13 && $(".search-bar input").val() != '')
    {
        location.href=location.origin+"/search/"+$(".search-bar input").val().replace(/ /g,"~");
    }
});

(function(){
  var socket = io.connect(location.origin);
  $(".registration-button").click(function(){
      if($("#register_sex").data("value") == 0){
          alert("Please select your sex.");
      } else if(register_password.value == register_repassword.value){
          socket.emit("register",{
              'name':register_name.value,
              'surename':register_surename.value,
              'email':register_email.value,
              'password':register_password.value,
              'sex':parseInt($("#register_sex").data("value"))
          });
      } else{
          alert("Reapeat password correctly");
      }
  });

  $(".settings-button").click(function(){
      if(settings_password.value == settings_repassword.value){
          socket.emit("settings",{
              'name':settings_name.value,
              'surename':settings_surename.value,
              'email':settings_email.value,
              'password':settings_password.value,
              '_vcc':getCookie("_vcc")
          });
      } else{
          alert("Reapeat password correctly");
      }
  });

  $(".bestseller-addtobag").click(function(event){
      update_buybox();
      socket.emit("addtobag",{code:"#"+$(this).parent().parent().data("code"),_vcc:getCookie("_vcc")});
  });

  $(".product-addtobag").click(function(event){
      update_buybox();
      socket.emit("addtobag",{code:"#"+$(this).parent().parent().parent().data("code"),_vcc:getCookie("_vcc")});
  });

  $("#logout").click(function(){
      delete_cookie("_vcc");
      location.reload();
  });

  $(".settings-popup-cancel").click(function(){
      $(".settings-div").fadeOut( 500,function(){
          $(".settings-popup").css("display","none");
          $("body").css("overflow","auto");
      } );
  });

  $("#settings").click(function(){
      $(".user-info-div").animate({
          opacity:0
      },100);
      $(".settings-div").fadeOut(0)
      $(".settings-popup").css("display","block");
      $("body").css("overflow","hidden");
      $(".settings-div").fadeIn( 500 );
      //location.reload();
  });

  $(".login-button").click(function(){
      socket.emit("login",{
          'email':login_email.value,
          'password':login_password.value
      });
  });

  window.update_buybox = function(){
      $(".user-buybox-div").html('<img src="/img/spinner.gif" width="80px" height="60px">');
      socket.emit("getbuybox",getCookie("_vcc"));
  };

  socket.on("register_success",function(data){
      document.cookie = "_vcc="+data._vcc+";path=/";
      location.reload();
  });
  socket.on("login_success",function(data){
      document.cookie = "_vcc="+data+";path=/";
      location.reload();
  });
  socket.on("register_email_exist",function(){
      alert("This email already exists");
  });
  socket.on("login_wrong",function(){
      alert("Email or password is wrong");
  });
  socket.on("settings_approved",function(){
      location.reload();
  });
  socket.on("addedtobag",function(){
      alert("Product was added to bag");
  });
  socket.on("gotbuybox",function(data){
      update_buybox_inteface(data);
  });
})();
