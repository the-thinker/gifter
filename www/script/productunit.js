
    var img_count = parseInt($(".product-images").data("img-count"));
    var img_number = 1;

    $(".product-images img").click(function(){
        var that = this;
        $(".product-images").animate({
            marginLeft:-img_count*480-480*($(this).data("img-number")-1)+90
        },500,function(){
            $(".product-images img").removeClass("selected-img");
            $($(".product-images img[data-img-number='"+parseInt($(that).data("img-number"))+"']")[1]).addClass("selected-img");
            img_number = parseInt($(that).data("img-number"));
        });
    });

    $(".product-picture-slide-left").click(function(){
        $(".product-images").animate({
            marginLeft:"+=480px"
        },500,function(){
            if(img_number == 1){
                img_number = img_count;
            } else{
                img_number-=1;
            }
            $(".product-images").css("marginLeft",-(img_count)*480-480*(img_number-1)+90);
            $(".product-images img").removeClass("selected-img");
            $($(".product-images img[data-img-number='"+img_number+"']")[1]).addClass("selected-img");
        });
    });

    $(".product-picture-slide-right").click(function(){
        $(".product-images").animate({
            marginLeft:"-=480px"
        },500,function(){
            if(img_number == img_count){
                img_number = 1;
            } else{
                img_number+=1;
            }
            console.log(img_number);
            $(".product-images").css("marginLeft",-(img_count)*480-480*(img_number-1)+90);
            $(".product-images img").removeClass("selected-img");
            $($(".product-images img[data-img-number='"+img_number+"']")[1]).addClass("selected-img");
        });
    });
    $(".product-info-menu-unit").click(function(){
        $(".product-info-menu-unit").removeClass("product-info-menu-unit-selected");
        $(this).addClass("product-info-menu-unit-selected");
        $(".product-info-content").css("display","none");
        $(".product-info-content[data-info-number='"+parseInt($(this).data("info-number"))+"']").css("display","block");
    });


    var currantrelatedNumber = 1;

    $(".related-lightbar[data-related-lightbar-number='1']").css("backgroundColor","#be926f");
    $(".related-menu-prew").click(function(){
        if(currantrelatedNumber>1){
            $(".related-line").css("display","block");
            console.log();
            $(".related").css("marginLeft",-62-(currantrelatedNumber-1)*1175+"px");
            $(".related").animate({
                marginLeft:"+=1175"
            },500,function(){
                $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#dddddd");
                currantrelatedNumber-=1;
                $(".related-line[data-related-number!='"+currantrelatedNumber+"']").css("display","none");
                $(".related").css("marginLeft","-62px");
                    $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#be926f");
            });
        } else {
            $(".related-line").css("display","block");
            $(".related").css("marginLeft",-62-(currantrelatedNumber-1)*1175+"px");
            $(".related").animate({
                marginLeft:"-=3525"
            },500,function(){
                $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#dddddd");
                currantrelatedNumber=4;
                $(".related-line[data-related-number!='"+currantrelatedNumber+"']").css("display","none");
                $(".related").css("marginLeft","-62px");
                    $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#be926f");
            });
        };
    });
    $(".related-menu-next").click(function(){
        if(currantrelatedNumber<4){
            $(".related-line").css("display","block");
            $(".related").css("marginLeft",-62-(currantrelatedNumber-1)*1175+"px");
            $(".related").animate({
                marginLeft:"-=1175"
            },500,function(){
                $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#dddddd");
                currantrelatedNumber+=1;
                $(".related-line[data-related-number!='"+currantrelatedNumber+"']").css("display","none");
                $(".related").css("marginLeft","-62px");
                $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#be926f");
            });
        } else {
            $(".related").css("marginLeft",-62-(currantrelatedNumber-1)*1175+"px");
                $(".related-line").css("display","block");
            $(".related").animate({
                marginLeft:"+=3525"
            },500,function(){
                $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#dddddd");
                currantrelatedNumber=1;
                $(".related-line[data-related-number!='"+currantrelatedNumber+"']").css("display","none");
                $(".related").css("marginLeft","-62px");
                    $(".related-lightbar[data-related-lightbar-number='" + currantrelatedNumber + "']").css("backgroundColor","#be926f");
            });
        };
    });

    $(".product-social-img")
      .mouseenter(function() {
        $(this).attr("src",$(this).attr("src").split(".pn")[0]+"_.png");
      })
      .mouseleave(function() {
        $(this).attr("src",$(this).attr("src").split("_")[0]+".png");
      });

      $('.add-to-cart').hover(function() {
        $('.add-to-cart img').attr('src', '/img/orange_cart.png');
      }, function() {
        $('.add-to-cart img').attr('src', '/img/white_cart.png');
      });

      $('.add-to-whishlist').hover(function() {
        $('.add-to-whishlist img').attr('src', '/img/white_heart.png');
      }, function() {
        $('.add-to-whishlist img').attr('src', '/img/gray_heart.png');
      });
