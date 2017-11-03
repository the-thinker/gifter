$(document).ready(function(){

    var currantSlide = 1;
    var sildeCount = 3
    var skipSlide = false;
    var stopSlide = false;


    $( ".slide-space" ).draggable({
        axis: "x",
        start: function() {
            stopSlide = true;
        },
        drag: function( event, ui) {
            //console.log(ui.position.left);
            if(ui.position.left >= 0 && parseFloat($( ".slide-space" ).css("marginLeft")) == 0 ){
                ui.position.left = 0;
                return 0;
            }
            if((ui.position.left+parseFloat($( ".slide-space" ).css("marginLeft"))) <= -1600 ){
                ui.position.left = 0;
                $( ".slide-space" ).css("marginLeft",-1600);
                return 0;
            }
        },
        stop: function( event, ui) {
            if(ui.position.left<-100){
                $(".slide-option").removeClass("selected-slide-option");
                $(".slide-option-selected").animate({
                    marginTop:"+=122"
                },200);
                $(".slide-space").animate({
                    left:"+="+(-ui.position.left),
                    marginLeft:"-=800"
                },200,function(){
                    currantSlide += 1;
                     $(".slide-option[data-slide-option-number='"+currantSlide+"']").addClass("selected-slide-option");
                     stopSlide = false;
                     skipSlide = true;
                });
            } else if(ui.position.left>+100){
                $(".slide-option").removeClass("selected-slide-option");
                $(".slide-option-selected").animate({
                    marginTop:"-=122"
                },200);
                $(".slide-space").animate({
                    left:"+="+(-ui.position.left),
                    marginLeft:"+=800"
                },200,function(){
                    currantSlide -= 1;
                     $(".slide-option[data-slide-option-number='"+currantSlide+"']").addClass("selected-slide-option");
                     stopSlide = false;
                     skipSlide = true;
                });
            } else{
                $(".slide-space").animate({
                    left:"+="+(-ui.position.left)
                },150,function(){
                    stopSlide = false;
                    skipSlide = true;
                });
            }
        }
    });

    setInterval(function(){
        if(skipSlide || stopSlide){
            skipSlide = false;
            return 0;
        }
        if(currantSlide!=sildeCount){
            $(".slide-option").removeClass("selected-slide-option");
            $(".slide-option-selected").animate({
                marginTop:"+=122"
            },200);
            $(".slide-space").animate({
                marginLeft:"-=800"
            },200,function(){
                currantSlide += 1;
                 $(".slide-option[data-slide-option-number='"+currantSlide+"']").addClass("selected-slide-option");
            });
        } else {
             $(".slide-option").removeClass("selected-slide-option");
            $(".slide-option-selected").animate({
                marginTop:"-=244"
            },200);
            $(".slide-space").animate({
                marginLeft:"0"
            },200,function(){
                currantSlide = 1;
                 $(".slide-option[data-slide-option-number='"+currantSlide+"']").addClass("selected-slide-option");
            });
        };
    },10000);

    $(".slide-option").click(function(){
         $(".slide-option").removeClass("selected-slide-option");
        var that = this;
        $(".slide-option-selected").animate({
            marginTop:"+="+($(that).data("slideOptionNumber")-currantSlide)*122
        },200);
        $(".slide-space").animate({
            marginLeft:(-800*($(that).data("slideOptionNumber")-1))
        },200,function(){
            currantSlide = $(that).data("slideOptionNumber");
             $(".slide-option[data-slide-option-number='"+currantSlide+"']").addClass("selected-slide-option");
            skipSlide = true;
        });
    });

});
