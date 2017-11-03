$(document).ready(function(){

    var is_header_hidden = false;
    $(window).scroll(function(event){
        if($(this).scrollTop()>400 && is_header_hidden == false){
            $(".header").css("top","-60px");
            $(".menu").css("top","0");
            $(".logo").css("marginTop","-95px");
            $(".logo").css("height","30px");
            $(".search").css("marginTop","-60px");
            is_header_hidden = true;
        } else if($(this).scrollTop()<400 && is_header_hidden == true){
            $(".header").css("top","0px");
            $(".menu").css("top","60px");
            $(".logo").css("marginTop","-90px");
            $(".logo").css("height","40px");
            $(".search").css("marginTop","0px");
            is_header_hidden = false;
        }
    });



    $(".search-logo").click(function(){
        if($(".user-info-div").css("opacity") != 0){
            $( ".user_icon" ).click();
        }
        if($(".search").css("height")!="0px"){
        $(".search-logo").css("background-image","url(/img/search.png)");
            $(".search").animate({
                "height":"0px"
            },500,function(){
                $(".search").css("display","none");
                $(".search-back").css("display","none");
                $("body").css("overflow","auto");
            });
            $(".main").animate({
                "paddingTop":"0px"
            },500);
            return 0;
        }
        //$(".search-bar input").focus();
        //document.getElementsByClassName("search-bar")[0].getElementsByTagName("input")[0].focus();
        $(".search-back").css("display","block");
        $("body").css("overflow","hidden");
        $(".search").css("height","0px");
        $(".search").css("display","initial");
        $(".search-logo").css("background-image","url(/img/close.png)");
        $(".search-bar input").focus();
        $(".search").animate({
            "height":"250px"
        },500);
        $(".main").animate({
            "paddingTop":"250px"
        },500);
    });

    $(".popup-cancel").click(function(){
        $(".sign-up-div").fadeOut( 500,function(){
            $(".sign-up-popup").css("display","none");
            $("body").css("overflow","auto");
        } );
    });

    $(".sign-up").click(function(){
        $(".sign-up-div").fadeOut(0)
        $(".sign-up-popup").css("display","block");
        $("body").css("overflow","hidden");
        $(".sign-up-div").fadeIn( 500 );
    });


    $( ".bestsellers-item" )
      .mouseenter(function() {
        $( this ).find( ".bestseller-overflow" ).css( "display","block");
        $( this ).find( ".bestseller-title" ).css( "color","#D52683" );
        $( this ).find( ".bestseller-image" ).css("width","150px");
        $( this ).find( ".bestseller-image" ).css("marginTop","165px");
        $( this ).find( ".bestseller-image" ).css("marginLeft","75px");
        $( this ).find( ".bestseller-price" ).css("color","#040a2b");
      })
      .mouseleave(function() {
        $( this ).find( ".bestseller-overflow" ).css( "display","none" );
        $( this ).find( ".bestseller-title" ).css( "color","black" );
        $( this ).find( ".bestseller-image" ).css("width","216px");
        $( this ).find( ".bestseller-image" ).css("marginTop","110px");
        $( this ).find( ".bestseller-image" ).css("marginLeft","41px");//be926f
        $( this ).find( ".bestseller-price" ).css("color","#D52683");
      });

    $(".footer-social-img")
      .mouseenter(function() {
        $(this).attr("src",$(this).attr("src").split(".pn")[0]+"_.png");
      })
      .mouseleave(function() {
        $(this).attr("src",$(this).attr("src").split("_")[0]+".png");
      });

      var currantBestsellerNumber = 1;
      var bestsellers_count = parseInt($(".bestsellers-list-select").data("bestsellers-count"));

      $("input[type=radio]").click(function(){
          var that = this;
          $(".bestsellers-line").css("display","block");
          $(".bestseller-first-line").css("marginLeft","calc( 50vw - "+ ( 600 + ( 1200 * ( currantBestsellerNumber - 1 ) ) )+"px )");
          $(".bestseller-first-line").animate({
              marginLeft:"+=" + ( 1200 * ( currantBestsellerNumber - $(that).data("radioBestsellerNumber") ) )
          },500,function(){
              $(".bestseller-first-line").css("marginLeft","calc( 50vw - 600px )");
              $(".bestsellers-line[data-bestseller-number!='"+$(that).data("radioBestsellerNumber")+"']").css("display","none");
              currantBestsellerNumber = $(that).data("radioBestsellerNumber");
          });
      });

      $("#bestsellers_next_page").click(function(){
          if(currantBestsellerNumber<bestsellers_count){
              $(".bestsellers-list-select input[ data-radio-bestseller-number='"+(currantBestsellerNumber+1)+"']").prop('checked', true);
              $(".bestsellers-line").css("display","block");
              $(".bestseller-first-line").css("marginLeft","calc( 50vw - "+ ( 600 + ( 1200 * ( currantBestsellerNumber - 1 ) ) )+"px )");
              $(".bestseller-first-line").animate({
                  marginLeft:"-=1200"
              },500,function(){
                  $(".bestseller-first-line").css("marginLeft","calc( 50vw - 600px )");
                  $(".bestsellers-line[data-bestseller-number!='"+ (currantBestsellerNumber + 1) +"']").css("display","none");
                  currantBestsellerNumber = currantBestsellerNumber + 1;
              });
          } else {
              $(".bestsellers-list-select input[ data-radio-bestseller-number='1']").prop('checked', true);
              $(".bestsellers-line").css("display","block");
              $(".bestseller-first-line").css("marginLeft","calc( 50vw - "+ ( 600 + ( 1200 * ( currantBestsellerNumber - 1 ) ) )+"px )");
              $(".bestseller-first-line").animate({
                  marginLeft:"+="+((bestsellers_count-2)*1200)
              },500,function(){
                  $(".bestseller-first-line").css("marginLeft","calc( 50vw - 600px )");
                  $(".bestsellers-line[data-bestseller-number!='1']").css("display","none");
                  currantBestsellerNumber = 1;
              });
          };
      });

      $("#bestsellers_prew_page").click(function(){
          if(currantBestsellerNumber>1){
              $(".bestsellers-list-select input[ data-radio-bestseller-number='"+(currantBestsellerNumber-1)+"']").prop('checked', true);
              $(".bestsellers-line").css("display","block");
              $(".bestseller-first-line").css("marginLeft","calc( 50vw - "+ ( 600 + ( 1200 * ( currantBestsellerNumber - 1 ) ) )+"px )");
              $(".bestseller-first-line").animate({
                  marginLeft:"+=1200"
              },500,function(){
                  $(".bestseller-first-line").css("marginLeft","calc( 50vw - 600px )");
                  $(".bestsellers-line[data-bestseller-number!='"+ (currantBestsellerNumber - 1) +"']").css("display","none");
                  currantBestsellerNumber = currantBestsellerNumber - 1;
              });
          } else {
              $(".bestsellers-list-select input[ data-radio-bestseller-number='"+bestsellers_count+"']").prop('checked', true);
              $(".bestsellers-line").css("display","block");
              $(".bestseller-first-line").css("marginLeft","calc( 50vw - "+ ( 600 + ( 1200 * ( currantBestsellerNumber - 1 ) ) )+"px )");
              $(".bestseller-first-line").animate({
                  marginLeft:"-="+((bestsellers_count-1)*1200)
              },500,function(){
                  $(".bestseller-first-line").css("marginLeft","calc( 50vw - 600px )");
                  $(".bestsellers-line[data-bestseller-number!='"+bestsellers_count+"']").css("display","none");
                  currantBestsellerNumber = bestsellers_count;
              });
          };
      });

      var currantNewProdcutNumber = 1;

      $(".newproducts-lightbar[data-newproducts-lightbar-number='1']").css("backgroundColor","#be926f");
      $(".newproducts-menu-prew").click(function(){
          if(currantNewProdcutNumber>1){
              $(".newproducts-line").css("display","block");
              $(".newproducts").css("marginLeft","calc( 50vw - "+(587+(currantNewProdcutNumber-1)*1175)+"px )");
              $(".newproducts").animate({
                  marginLeft:"+=1175"
              },500,function(){
                  $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#dddddd");
                  currantNewProdcutNumber-=1;
                  $(".newproducts-line[data-newproducts-number!='"+currantNewProdcutNumber+"']").css("display","none");
                  $(".newproducts").css("marginLeft","calc( 50vw - 587px )");
                      $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#be926f");
              });
          } else {
              $(".newproducts-line").css("display","block");
              $(".newproducts").css("marginLeft","calc( 50vw - "+(587+(currantNewProdcutNumber-1)*1175)+"px )");
              $(".newproducts").animate({
                  marginLeft:"-=3525"
              },500,function(){
                  $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#dddddd");
                  currantNewProdcutNumber=4;
                  $(".newproducts-line[data-newproducts-number!='"+currantNewProdcutNumber+"']").css("display","none");
                  $(".newproducts").css("marginLeft","calc( 50vw - 587px )");
                      $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#be926f");
              });
          };
      });
      $(".newproducts-menu-next").click(function(){
          if(currantNewProdcutNumber<4){
              $(".newproducts-line").css("display","block");
              $(".newproducts").css("marginLeft","calc( 50vw - "+(587+(currantNewProdcutNumber-1)*1175)+"px )");
              $(".newproducts").animate({
                  marginLeft:"-=1175"
              },500,function(){
                  $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#dddddd");
                  currantNewProdcutNumber+=1;
                  $(".newproducts-line[data-newproducts-number!='"+currantNewProdcutNumber+"']").css("display","none");
                  $(".newproducts").css("marginLeft","calc( 50vw - 587px )");
                  $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#be926f");
              });
          } else {
              $(".newproducts").css("marginLeft","calc( 50vw - "+(587+(currantNewProdcutNumber-1)*1175)+"px )");
                  $(".newproducts-line").css("display","block");
              $(".newproducts").animate({
                  marginLeft:"+=3525"
              },500,function(){
                  $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#dddddd");
                  currantNewProdcutNumber=1;
                  $(".newproducts-line[data-newproducts-number!='"+currantNewProdcutNumber+"']").css("display","none");
                  $(".newproducts").css("marginLeft","calc( 50vw - 587px )");
                      $(".newproducts-lightbar[data-newproducts-lightbar-number='" + currantNewProdcutNumber + "']").css("backgroundColor","#be926f");
              });
          };
      });

      $(".language-option").click(function(){
          document.cookie = "language="+this.innerText.toLowerCase()+";path=/";
          location.reload();
      });

      $("#register_sex img").click(function(){
          $("#register_sex").data("value",$(this).data("type"));
          $("#register_sex img").css("opacity",0.5);
          $(this).css("opacity",1);
      });

      $( ".user_icon" ).click(function() {
            if($(".search").css("height")!="0px"){
                $(".search-logo").click();
            }
            if($(".user-info-div").css("opacity") == 0){
                $(".user-info-div").css("display","block");
                $(".user-info-div").animate({
                    opacity:1
                },200);
            } else{
                $(".user-info-div").animate({
                    opacity:0
                },200,function(){
                    $(".user-info-div").css("display","none");
                });
            }
        });
        $(".basket-logo").click(function(){
              if($(".search").css("height")!="0px"){
                  $(".search-logo").click();
              }
              if($(".user-buybox-div").css("opacity") == 0){
                  $(".user-buybox-div").css("display","block");
                  $(".user-buybox-div").animate({
                      opacity:1
                  },200,function(){
                      update_buybox();
                  });
              } else{
                  $(".user-buybox-div").animate({
                      opacity:0
                  },200,function(){
                      $(".user-buybox-div").css("display","none");
                  });
              }
        });


});
