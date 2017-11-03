$(document).ready(function(){

    var product_count = parseInt($(".product-line").data("product-count"));

    $( ".product-line" ).draggable({
        axis: "x",
        drag: function( event, ui) {
            console.log(product_count  * 300 <= $("body").width());
            if(ui.position.left > 0){
                ui.position.left = 0;
            } else if(product_count  * 300 <= $("body").width()){
                ui.position.left = 0;
            } else if(-ui.position.left >= (product_count  * 300 - $("body").width()) ){
                ui.position.left = -(product_count  * 300 - $("body").width());
            }
            $( ".product-line" ).css("left",ui.position.left);
        }
    });

    $( ".product-item" )
      .mouseenter(function() {
        $( this ).find( ".product-overflow" ).css( "display","block");
        $( this ).find( ".product-title" ).css( "color","#be926f" );
        $( this ).find( ".product-image" ).css("width","150px");
        $( this ).find( ".product-image" ).css("marginTop","165px");
        $( this ).find( ".product-image" ).css("marginLeft","75px");
      })
      .mouseleave(function() {
        $( this ).find( ".product-overflow" ).css( "display","none" );
        $( this ).find( ".product-title" ).css( "color","black" );
        $( this ).find( ".product-image" ).css("width","216px");
        $( this ).find( ".product-image" ).css("marginTop","110px");
        $( this ).find( ".product-image" ).css("marginLeft","41px");
      });
});
