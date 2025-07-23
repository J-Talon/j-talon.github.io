




$(document).ready(function() {

    let chance = Math.random();
    if (chance > 0.9) {
        showcookie($(this).find("#thecookie"));
    }
    else {
        $(this).find("#thecookie *").css("display","none");
    }
});










function showcookie(content) {

    const TIME = 1000;
    let contentHeight = content[0].scrollHeight + 10;

    setTimeout(function() {
        content.css('transition','');

        requestAnimationFrame(function() {

            requestAnimationFrame(function() {
                content.animate({
                    height: contentHeight,
                    opacity: 1,
                }, TIME,0);
            });
    });
    }, TIME);

}


