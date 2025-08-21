


let continueTicking = true;
let h1text = "";
let h2text = "";

let ticksWaited = 0;


$(document).ready(function() {
    let h1 = $(this).find("#header1");
    let h2 = $(this).find("#header2");
    h1text = h1.text();
    h2text = h2.text();
    h1.text("");
    h2.text("");

    tick(this);
});


function tick(reference) {
    const TICK_TIME = 50;
    let timeSinceLastTick = 0;
    let lastTickTime = 0;

    function step(timestamp) {

        timeSinceLastTick = timestamp - lastTickTime;
        if (timeSinceLastTick > TICK_TIME) {
            lastTickTime = timestamp;
            tickAction(reference);
        }

        if (continueTicking) {
            requestAnimationFrame(step);
        }
    }

    //start the loop
    requestAnimationFrame(step);
}


function tickAction(reference) {

    const WAIT_TICKS = 10;
    let h1 = $(reference).find("#header1");
    let h2 = $(reference).find("#header2");

    if (!construct(h1, h1text))
        return;

    if (ticksWaited < WAIT_TICKS) {
        ticksWaited ++;
        return;
    }

    if (construct(h2, h2text)) {
        continueTicking = false;
    }


}


function construct(h1, value) {
    let current = h1.text();
    if (current.length < value.length) {
        nextLength = current.length + 1;
        let substr = value.substring(0,nextLength);
        h1.text(substr);
        return false;
    }
    return true;
}
