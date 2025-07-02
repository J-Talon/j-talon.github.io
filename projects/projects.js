




$(document).ready(function() {

    hoverEvents();
    clickEvents();
});


function hoverEvents() {
    
    //parent
    $(".previewbox").hover(function() {
       $(this).find(".overlay-img").css("filter","grayscale(0%)").css("cursor","pointer");
       $(this).css("color","white");
    }, function() {
        $(this).find(".overlay").css("color","black");
        $(this).find(".overlay-img").css("filter","grayscale(100%)");
    });

    //overlay
        $(".previewbox .overlay").hover(function() {
       $(this).parent().find(".overlay-img").css("filter","grayscale(0%)");
       $(this).css("cursor","pointer");
       $(this).css("color","white");
    }, function() {
        $(this).css("color","black");
        $(this).parent().find(".overlay-img").css("filter","grayscale(100%)");
    });

    //image sibling
        $(".previewbox .overlay-img").hover(function() {
       $(this).css("filter","grayscale(0%)").css("cursor","pointer");
       $(this).parent().find(".overlay").css("color","white");
    }, function() {
        $(this).parent().find(".overlay").css("color","black");
        $(this).css("filter","grayscale(100%)");

    });
}



function clickEvents() {

    $(".collapse-button").click(function() {
        let article = $(this).closest(".databox-transitional");
        if (!article.attr('expanded') === 'true') {
            return;  
        }
        toggle(article);
  

    });

    
    $(".project-article").click(function() {
            let article = $(this).find(".databox-transitional");
            if (article.attr('expanded') === 'true') {
                return;
            }

            

            toggle(article);
    });

};


function toggle($article) {


    let content = $article.find(".contentbox");
    let preview = $article.find(".previewbox");

    const TIME = 1000;

    let expanded = $article.attr('expanded') === 'true';

    if (expanded) {
        preview.css('transition','');

        requestAnimationFrame(function() {

            requestAnimationFrame(function() {
                content.animate({
                    height: 0,
                    opacity: 0
                }, TIME, function() {
                    $article.attr('expanded','false');
                
                });

                preview.animate({
                    height: '10rem',
                    opacity: 1,
                    border: '5px groove white'
                }, TIME);
                
            });
    });


    }
    else {
        let contentHeight = content[0].scrollHeight;
        content.css('transition','');

        requestAnimationFrame(function() {

            requestAnimationFrame(function() {
                content.animate({
                    height: contentHeight,
                    opacity: 1
                }, TIME, function() {
                    $article.attr('expanded','true');
            
                });

                preview.animate({
                    height: 0,
                    opacity: 0,
                    border: 'none'
                }, );
                
            });
    });
    }

}
