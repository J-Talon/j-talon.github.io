




$(document).ready(function() {
    showcookie($(this).find("#thecookie"));
});



function randomNumber() {
    return (Math.random() * 5) + 1;
}


function showcookie(content) {

    const TIME = 1000;

    setTimeout(function() {
        content.css('transition','');

        requestAnimationFrame(function() {

            requestAnimationFrame(function() {
                content.animate({
                    height: '3rem',
                    opacity: 1
                }, TIME);
            });
    });
    }, randomNumber() * 1000);

}