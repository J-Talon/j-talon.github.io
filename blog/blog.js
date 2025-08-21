




let POSTS = "Blog posts";
let hovering = false;
let message = "Enter the backroom";
let index = 0;

let glitchTicks = 0;
let lastGlitchTime = 0;
let hoverticks = 0;

let strength = 0;


const DEFAULT_RGB = [33,37,38];
const curr_rgb = [33,37,38];

let cursed = false;


$(document).ready(function() {

    let chance = Math.random();
    if (chance > 0) {
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

    if (hovering) {
        strength = Math.min(message.length, strength + 1);
        glitchTicks = 0;
    }
    else {
        strength = Math.max(0, strength - 1);
    }

    if (glitchTicks <= 0 && strength <= 0) {
        let chance = Math.random();
        if (chance > 0 && (timestamp - lastGlitchTime > 2000)) {
            lastGlitchTime = timestamp;
            glitchTicks = (Math.random() * 20) + 10; 
        }
    }
    else {
        glitchEffect(reference, title, 0.5);
    }

    if (strength <= 0) {
        glitchTicks --;
        glitchEffect(reference, title, 0.95);
        return;
    }
}


function getRandomletter() {
    return String.fromCharCode(Math.random() * 26 + 97);
}

function glitchEffect(reference, title, threshold) {

    const MAX_PADDING = 10;
    let padding = 0;
    let mainbg = $(reference).find("#mainbg");
    let text = POSTS;
    let result = "";

    if (strength > 0) {

        let letters = [getRandomletter(), getRandomletter(), getRandomletter()];
        let center = message.length / 2;
        let showcase = message.substring(Math.max(center - strength, 0), Math.min(message.length, center + strength));
        result = letters[0]+letters[1]+letters[2]+"<<"+showcase+">>"+letters[2]+letters[1]+letters[0];

        curr_rgb[0] = Math.min(DEFAULT_RGB[0], Math.max(DEFAULT_RGB[0] - strength,0));
        curr_rgb[1] = Math.min(DEFAULT_RGB[1], Math.max(DEFAULT_RGB[1] - strength,0));
        curr_rgb[2] = Math.min(DEFAULT_RGB[2], Math.max(DEFAULT_RGB[2] - strength,0));
        let string = "rgb("+curr_rgb[0]+", "+curr_rgb[1]+","+curr_rgb[2]+")";
        mainbg.css("background-color",string);

        padding = (Math.pow(strength, 0.5)) * MAX_PADDING / message.length;
        let padstr = padding+"rem 0 "+padding+"rem 0";
        title.css("padding",padstr);
    }
    else {

        curr_rgb[0] = DEFAULT_RGB[0];
        curr_rgb[1] = DEFAULT_RGB[1];
        curr_rgb[2] = DEFAULT_RGB[2];
        mainbg.css("background-color","");
        title.css("padding","");

        if (glitchTicks <= 0) {
            title.text(POSTS);
            return;
        }

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


