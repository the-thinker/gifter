

      var currantBottomSliderNumber = 1;
      var BottomSliderCount = parseInt($(".bottom-slider-content").data("bottom-slider-count"));

$( ".bottom-slider-content" ).draggable({
    axis: "x",
    start: function() {
    },
    drag: function( event, ui) {
        if(ui.position.left >= 0 && parseFloat($( ".bottom-slider-content" ).css("marginLeft")) >= 0 ){
            ui.position.left = 0;
            return 0;
        }
        if((ui.position.left+parseFloat($( ".bottom-slider-content" ).css("marginLeft"))) <= -2150 ){
            ui.position.left = 0;
            $( ".bottom-slider-content" ).css("marginLeft",-2150);
            return 0;
        }
    },
    stop: function( event, ui) {
        if(ui.position.left<-150){
            $(".bottom-slider-content").animate({
                left:"+="+(-ui.position.left),
                marginLeft:"-=1100"
            },1000,function(){
                currantBottomSliderNumber += 1;
            });
        } else if(ui.position.left>150){
            $(".bottom-slider-content").animate({
                left:"+="+(-ui.position.left),
                marginLeft:"+=1100"
            },1000,function(){
                currantBottomSliderNumber -= 1;
            });
        } else{
            $(".bottom-slider-content").animate({
                left:"+="+(-ui.position.left)
            },500,function(){
            });
        }
    }
});



      $(".bottom-slider-left-arrow-img").click(function(){
          if(currantBottomSliderNumber>1){
              $(".bottom-slider-content").animate({
                  marginLeft:"+=1100"
              },500,function(){
                  currantBottomSliderNumber-=1;
              });
          } else {
              $(".bottom-slider-content").animate({
                  marginLeft:"-="+(1100*(BottomSliderCount-1))
              },500,function(){
                  currantBottomSliderNumber=BottomSliderCount;
              });
          };
      });
      $(".bottom-slider-right-arrow-img").click(function(){
          if(currantBottomSliderNumber<BottomSliderCount){
              $(".bottom-slider-content").animate({
                  marginLeft:"-=1100"
              },500,function(){
                  currantBottomSliderNumber+=1;
              });
          } else {
              $(".bottom-slider-content").animate({
                  marginLeft:"+="+(1100*(BottomSliderCount-1))
              },500,function(){
                  currantBottomSliderNumber=1;
              });
          };
      });
