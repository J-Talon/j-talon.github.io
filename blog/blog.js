




var POSTS = "Blog posts";
var hovering = false;
var message = "Enter the backroom?";
var index = 0;

var glitchTicks = 0;
var lastGlitchTime = 0;
var hoverticks = 0;

const DEFAULT_RGB = [33,37,38];
const curr_rgb = [33,37,38];

var cursed = false;


$(document).ready(function() {

    let chance = Math.random();
    if (chance > 0.5) {
        cursed = true;
        showcookie($(this).find("#thecookie"));
        $(this).find("#cookiemsg").text("Here have a cookie :P");

        // $("#title").remove();
        // let link = $('<a>').attr('href',"").text(POSTS).attr("id","title").addClass("no-margin-td white fanwood-font");
        // $(this).find("#titleholder").append(link);
        // hoverEvents(this);
    }
    else {
        $(this).find("#thecookie *").css("display","none");
    }


    //tick(this);
});



function hoverEvents(reference) {
    $(reference).find("#title").hover(function() {
        hovering = true;
    },

    function() {
        hovering = false;
    }

   );
}



function tick(reference) {
    const TICK_TIME = 30;
    let timeSinceLastTick = 0;
    let lastTickTime = null;

    function step(timestamp) {

        if (lastTickTime == null) {
            lastTickTime = timestamp;
        }
        timeSinceLastTick = timestamp - lastTickTime;
        
        if (timeSinceLastTick >= TICK_TIME) {
            tickAction(timestamp, reference);
            lastTickTime = timestamp;
        }
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

}


function tickAction(time, reference) {

    if (hovering) {
        hoverticks ++;
    }
    else {
        hoverticks = 0;
    }

    if (cursed)
        glitch(reference, $(reference).find("#title"), time);
}



function glitch(reference, title, timestamp) {

    let mainbg = $(reference).find("#mainbg");

    if (hovering) {
        glitchEffect(title, 0.5);
        let r = curr_rgb[0];
        let g = curr_rgb[1];
        let b = curr_rgb[2];

        let string = "rgb("+r+", "+g+","+b+")";

        mainbg.css("background-color",string);
        r = Math.max(r - 1, 0);
        g = Math.max(g - 1, 0);
        b = Math.max(b - 1, 0);

        curr_rgb[0] = r;
        curr_rgb[1] = g;
        curr_rgb[2] = b;
    }
    else {

        if (glitchTicks <= 0){
            title.text(POSTS);
            curr_rgb[0] = DEFAULT_RGB[0];
            curr_rgb[1] = DEFAULT_RGB[1];
            curr_rgb[2] = DEFAULT_RGB[2];
            mainbg.css("background-color","");
        }

        if (glitchTicks > 0) {
            glitchTicks --;
            glitchEffect(title, 0.95);
            return;
        }
        
        let chance = Math.random();
        if (chance > 0 && (timestamp - lastGlitchTime > 2000)) {
            lastGlitchTime = timestamp;
            glitchTicks = (Math.random() * 20) + 10; 
        }
    }
}


function getRandomletter() {
    return String.fromCharCode(Math.random() * 26 + 97);
}

function glitchEffect(title, threshold) {

    let text = POSTS;
    let result = "";

    if (hovering) {

        let letters = [getRandomletter(), getRandomletter(), getRandomletter()];
        result = letters[0]+letters[1]+letters[2]+"<<"+message+">>"+letters[2]+letters[1]+letters[0];
    }
    else {

        for (let i = 0; i < text.length; i ++) {
        let random = Math.random();
        if (random > threshold) {
        result += getRandomletter();
        }
        else {
            result += text[i];
        }


        }
    }
    title.text(result);
}








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


