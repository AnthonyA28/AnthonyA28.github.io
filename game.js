"use strict";
var gaming_mode = true;
var game_keypress_fn; // a global pointer to a scoped function

/* Scoped */
{




var GAME_JSON; // Will resolve to that in data.js or undefined
let P;
let CVS_M; // for the map
let CVS_G; // for the Game/player
let CVS_BG; // for background information
let G_keys = [];
let GAMEWIDTH;
let GAMEHEIGHT;



function __INIT_INFO() {
    var INIT_RESULT = true;
    /* GAME_JSON was initialized from data.js it will be defined */
    if ( document.getElementById("json") != undefined ) {
        GAME_JSON = document.getElementById("json").value;
        if (GAME_JSON == '' || GAME_JSON == undefined){
            INIT_RESULT = false;
            alert("ERROR: NO GAME INFORMATION! Ensure valid game information is encoded in JSON in 'data.js'");
            return INIT_RESULT;
        }
    }

    /* Initialize only if the JSON info is found. */
    P             = JSON.parse(GAME_JSON);
    CVS_BG        = document.getElementById("Canvas_game_l1");
    CVS_M         = document.getElementById("Canvas_game_l2");
    CVS_G         = document.getElementById("Canvas_game_l3");
    GAMEWIDTH     = CVS_M.width;
    GAMEHEIGHT    = CVS_M.height;
    return INIT_RESULT;
}






let  particles;
let  angle;


/****
    Global Variables.
 **/
let  G_delta;

let G_message;
let G_pixPos = {};
let flag;
let PLAYERMAP;

let player;
let map;
let tree1;
let trees;

let sunPos;
let moonPos;
let G_partMode;

/* Press the Play Button by default*/
document.getElementById("play_game").onclick = function() {
    if( __INIT_INFO() ) {
        init();
    }
}
document.getElementById("play_game").dispatchEvent(new MouseEvent("click"));





function init() {

    /****
    Global Variables.
 **/
    angle = 0;
    G_message   = "";
    if( Math.floor(Math.random() + 0.4) ) {
        G_partMode = "rain";
    } else if ( Math.floor(Math.random() + 0.8)){
        G_partMode = "snow";
    } else {
        G_partMode = "";
    }


    map = {
        curSpr: 2,
    }

    flag        = 0;
    PLAYERMAP   = init_pixMap(P[500].length, P[500][0].length);

    sunPos=0;
    moonPos=GAMEHEIGHT*4;

    player = {
        curSpr: 97,
        minSpr: 97,
        maxSpr: 100,
        upSpr: 101,
        downSpr: 102,
        jumpSpr: 101,
        dtIter: 100,
        lastDraw: 0,
        dirRight: false,
        iter: true,
        x:30,
        y:100,
        jump_set: 0,
        air:  function() {

            if( player.jump_set > 0){
                player.y -= 1;
                player.jump_set -=1;
                return true;
            } else {
                player.y +=1;
                return false;
            }
        }
    }

    trees = [];
    tree1 = {
        t_start:0,
        curSpr: 207,
        minSpr:207,
        maxSpr:210,
        map: 500,
        x: 50,
        y: 100,
        growthRate: 2000,
    }
    TREE_reset(tree1);
    trees.push(tree1);

    reset_PARTICLES();



    draw_M();// clear all screens
    draw_pixmap(CVS_M, P[map.curSpr]);

    window.requestAnimationFrame(GAMELOOP)

    CVS_G.addEventListener('mousemove', function(evt) {
        let mousePos = getMousePos(CVS_G, evt);
        G_pixPos = get_pixel_pos(mousePos, P[map.curSpr], CVS_G.width, CVS_G.height);
    }, false);

}


function TREE_reset(tree1){
    tree1.curSpr   = tree1.minSpr;
    tree1.interval = setInterval(
        function (tree1) {
             if( tree1.curSpr >= tree1.maxSpr ) {
                clearInterval(tree1.interval);
                return;
            }
            tree1.curSpr += 1;
            return;
    },
    tree1.growthRate, tree1)
}





function draw_BG() {
    let cxt = CVS_BG.getContext("2d");
    cxt.clearRect(0,0,GAMEWIDTH, GAMEHEIGHT);
    // cxt.beginPath();
    // cxt.rect(0, 0, GAMEWIDTH, GAMEHEIGHT);
    sunPos -= G_delta/40;
    moonPos -= G_delta/40;
    // sunPos -= G_delta;
    // moonPos -= G_delta;

    if(sunPos < -GAMEHEIGHT *4) sunPos = 4*GAMEHEIGHT ;
    let grd = cxt.createRadialGradient(GAMEWIDTH/2+sunPos/4,GAMEHEIGHT+sunPos,30,GAMEWIDTH/2+sunPos/4,GAMEHEIGHT+sunPos,300);
    grd.addColorStop(0,"#db821d");

    let rgba = hexToRgb("#ffb5b5");
    let rgbb = hexToRgb("#5c8b93");
    let mixLevel = 1-Math.abs((sunPos/(GAMEHEIGHT*1.5)));
    mixLevel = (mixLevel > 0.4 ) ? 0.4 : mixLevel;
    mixLevel = (mixLevel < 0 ) ? 0 : mixLevel;
    let mixed = colorMixer(rgba, rgbb, mixLevel);
    mixed = rgbToHex(mixed[0], mixed[1], mixed[2]);
    grd.addColorStop(1,mixed);
    cxt.fillStyle = grd;
    cxt.fillRect(0, 0, GAMEWIDTH, GAMEHEIGHT);

    if( moonPos < -GAMEHEIGHT *4) moonPos = 4*GAMEHEIGHT ;
    if ( sunPos > GAMEHEIGHT*2 || sunPos < -2*GAMEHEIGHT ){
        grd = cxt.createRadialGradient(GAMEWIDTH/2+moonPos,GAMEHEIGHT/2+moonPos,5,GAMEWIDTH/2+moonPos,GAMEHEIGHT/2+moonPos,30);
        grd.addColorStop(0,"#FFFFFF");

        let rgba = hexToRgb("#000000");
        let rgbb = hexToRgb("#5c8b93");
        let mixLevel = 1-Math.abs((moonPos/(GAMEHEIGHT*1.5)));
        mixLevel = (mixLevel > 0.4 ) ? 0.4 : mixLevel;
        mixLevel = (mixLevel < 0 ) ? 0 : mixLevel;
        let mixed = colorMixer(rgba, rgbb, mixLevel);
        mixed = rgbToHex(mixed[0], mixed[1], mixed[2]);
        grd.addColorStop(1,mixed);
        cxt.fillStyle = grd;
        cxt.fillRect(0, 0, GAMEWIDTH, GAMEHEIGHT);

    }

    /* Draw_PARTICLES */
    update_PARTICLES();
    if( G_partMode == "rain" ) {
        cxt = CVS_BG.getContext("2d");
        cxt.fillStyle = "rgba(206, 236, 240, 0.5)";
    } else if (G_partMode == "snow"){
        cxt.fillStyle = "rgba(255, 255, 255, 0.8)";
    } else {
        return;
    }

    cxt.beginPath();
    for(let i = 0; i < particles.length; i++) {
        let p = particles[i];
        cxt.moveTo(p.x, p.y);
        cxt.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    cxt.fill();


}


function draw_G() {
    let cxt = CVS_G.getContext("2d");
    cxt.clearRect(0,0,GAMEWIDTH, GAMEHEIGHT);
    cxt.font = '12pt Calibri';
    cxt.fillStyle = 'black';
    cxt.fillText(G_message, 2, 12);
    G_message = '';

    let t=0;
    for(; t<trees.length; t++){
        if( trees[t].map == map.curSpr){
            draw_pixmap(CVS_G, P[trees[t].curSpr], 1, P[map.curSpr].length, P[map.curSpr][0].length, trees[t].x, trees[t].y);
        }
    }
    draw_pixmap(CVS_G, P[player.curSpr], 1, P[map.curSpr].length, P[map.curSpr][0].length, player.x, player.y, !player.dirRight);

}


function draw_M(){
    let cxt = CVS_M.getContext("2d");
    cxt.clearRect(0,0,GAMEWIDTH, GAMEHEIGHT);
    draw_pixmap(CVS_M, P[map.curSpr]);
}

/***
    The main drawing function.
    Called at each refresh.
    Use it to draw all the relavent maps and sprites.
*/
function __draw() {
    draw_BG();
    draw_G();

}



/***
    The main action function.
    All that should have occured between time_now and time_now - G_delta
    should be placed here.
*/
let time_prev=0;
function __update(time_now) {
    G_delta = time_now - time_prev;
    time_prev = time_now;

    /* If player goes out of map bounds towards right . */
    if( player.x+P[player.minSpr].length >= P[map.curSpr].length && G_keys[39]) {
        map.curSpr += 1;
        player.x = 2;
        draw_M();
        return;
    }
    /* If player goes out of map bounds towards left . */
    if( player.x <= 0 && G_keys[37]) {
        map.curSpr -= 1;
        player.x = P[map.curSpr].length-6-2;
        draw_M();
        return;
    }



    /* Handle movement from keyboard */
    const x_prev = player.x;
    const y_prev = player.y;
    if ( G_keys[39] && !G_keys[38] && !G_keys[40]) {// right arrow: 39
        player.x += 1;
        player.dirRight = true;
        iter_spr(time_now, player);

    } else if ( G_keys[37] && !G_keys[38] && !G_keys[40]) { // left arrow: 37
        player.x -= 1;
        player.dirRight = false;
        iter_spr(time_now, player);

    } else {
        player.curSpr = player.minSpr;
    }

    /* Check map bounds and if player is on a solid surface (Flag == 1) */
    if( !inMap(player.x,player.y+P[player.minSpr][0].length-1, P[map.curSpr])
    || fmap(player.x, player.y, P[map.curSpr],  1)
    || fmap(player.x+P[player.minSpr].length-1, player.y,P[map.curSpr],  1)) {
        player.x = x_prev;
        player.curSpr = player.minSpr;
    }

    if ( G_keys[38] ) { // up arrow : 38
        player.curSpr = player.upSpr;
    }
    if ( G_keys[40] ) { // down arrow: 40
        player.y += 1;
        player.curSpr = player.downSpr;
    }

    /* Gravity */
    if ( player.air() && !G_keys[38] && !G_keys[40]){
        player.curSpr = player.jumpSpr;
    }


    let it = 0
    while( !inMap(player.x, player.y+P[player.minSpr][0].length-1, P[map.curSpr])
    || fmap(player.x, player.y+P[player.minSpr][0].length-1, P[map.curSpr], 1)
    || fmap(player.x+P[player.minSpr].length-1, player.y+P[player.minSpr][0].length-1,P[map.curSpr],  1) ){
        player.y -= 1 ;
        it += 1;
        if( it > 10000 ) {
            console.log("Warning, character reached max iterations.")
            break;
        }
    }


    G_message += ' t: ' + time_now + ', ' ;
    G_message += ' Dt: ' + G_delta + '. '
    G_message += ' fps:' + get_fps();
    G_message += ' PlayerPos( x:' + player.x + ', y :' + player.y + '), ';
    G_message += ' pixPos( x: ' + G_pixPos.x + ', y: ' + G_pixPos.y + ')';
}

/***
 The callback function called every G_delta
 */
let last = 0;
function GAMELOOP(time){
    if( time - last > 1000/(120) ){
        last = time;
        __update(time);
        __draw();
    }

    window.requestAnimationFrame(GAMELOOP);
}



function keyClicked(clicked){

    let y_prev =  player.y;
        if( clicked[88] ) {
            let x = player.x;
            if (player.dirRight){
                x += 13;
            }else{
                x -= 8;
            }

            let remainder = x%8;
            x -= remainder;
            remainder = player.y%8;
            let newTree = clone(tree1);
            newTree.x = x;
            newTree.y = (P[map.curSpr][0].length-8)-P[newTree.curSpr][0].length;
            if( !fobjmap(newTree.x,newTree.y-1,P[newTree.curSpr],P[map.curSpr], 1) ) {
                newTree.map = map.curSpr;
                TREE_reset(newTree);
                trees.push(newTree);
            }

        }

    /* Handle jump */
    if( clicked[90]
        && (!inMap( player.x, player.y+P[player.minSpr][0].length, P[map.curSpr], 1)
            ||fmap(player.x, player.y+P[player.minSpr][0].length, P[map.curSpr], 1)
            ||fmap(player.x+P[player.minSpr].length, player.y+P[player.minSpr][0].length, P[map.curSpr], 1))
    ) {
        // player.y -=5;
        player.jump_set = 10
        if( G_keys[38] ){
            player.jump_set += 10
        }
    }



    /* Enter door if up button is clicked */
    if( clicked[38] ){

        if( fobjmap(player.x, player.y,P[player.minSpr], P[map.curSpr], 3)  ) {
            /* Enterng Right Door*/
            map.curSpr += 1;
            let posDoor = findFlag(2,P[map.curSpr] );
            player.x = posDoor.x;
            player.y = posDoor.y;
            draw_M();

        }else if (fobjmap(player.x, player.y,P[player.minSpr], P[map.curSpr], 2)) {
            /* Entering Left Door */
            map.curSpr -= 1;
            let posDoor = findFlag(3,P[map.curSpr] );
            player.x = posDoor.x;
            player.y = posDoor.y;
            draw_M();
        }

    }

}




function iter_spr(time_now, obj) {
    if( ! obj.iter ) {
        obj.curSpr = obj.minSpr;
        return;
    }
    if( time_now - obj.lastDraw > obj.dtIter ){
        obj.lastDraw = time_now;
        obj.curSpr += 1;
        if ( obj.curSpr > obj.maxSpr ) {
            obj.curSpr = obj.minSpr;
        }
        // obj.curSpr;
        return;
    }
    return;
}


let keysPrev = [];
var game_keypress_fn = function (e) {
    e = e || event; // to deal with IE
    G_keys[e.keyCode] = e.type == 'keydown';
    let k;
    let keysClicked = [];
    for(k=0; k < G_keys.length; k ++ ){
        keysClicked[k] = ( (G_keys[k] != keysPrev[k]) && ( G_keys[k] ) );
        keysPrev[k]    = G_keys[k];
        // keysClicked[e.keyCode] = ( (keys[e.keyCode] != keysPrev[e.keyCode]) ) && ( keys[e.keyCode] ) ;
    }
    keyClicked(keysClicked);
}




function reset_PARTICLES() {

    let W = GAMEWIDTH;
    let H = GAMEHEIGHT;
    let mp = 100; //max particles
    particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*1+1, //radius
            d: Math.random()*mp //density
        });
    }

}

//Function to move the_PARTICLESflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
function update_PARTICLES(){
    if(G_partMode == "rain"){
        if( Math.floor(Math.random() + 0.000005)) {
            G_partMode = "snow";
            reset_PARTICLES();
        }
    } else if (G_partMode=="snow"){
        if (Math.floor(Math.random() + 0.000005)) {
            G_partMode = "";
            reset_PARTICLES();
        }
    }else if (G_partMode=="") {
        if(Math.floor(Math.random() + 0.000005)) {
            G_partMode = "rain";
            reset_PARTICLES();
        }
        return;
    }
    let W = GAMEWIDTH;
    let H = GAMEHEIGHT;
    angle += 0.005;
    for(let i = 0; i < particles.length; i++) {
        let p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius

        if( G_partMode == "rain" ) {
            p.y += Math.cos(angle+p.d)*0.1 + 4*p.r;
        }else {
            p.y += Math.cos(angle+p.d) + 0.8 + p.r/2;
        }

        if( G_partMode == "rain"){
            p.x += Math.sin(angle)*0.005 ;
        }else {
            p.x += Math.sin(angle)*1.5 ;
        }


        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if(p.x > W+5 || p.x < -5 || p.y > H) {
            if(i%3 > 0) {//66.67% of the flakes
                particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
            }else{
                //If the flake is exitting from the right
                if(Math.sin(angle) > 0){ //Enter from the left
                    particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                }else{//Enter from the right
                    particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                }
            }
        }
    }
    //animation loop
    // setInterval(draw, 33);
}



// Get the canvas element form the page


// function fullscreen(){
//        var el  = document.getElementById("Canvas_game_l1");
//        var el2 = document.getElementById("Canvas_game_l2");
//        var el3 = document.getElementById("Canvas_game_l3");

//       //  if(el.webkitRequestFullScreen) {
//       //      el.webkitRequestFullScreen();
//       //      el2.webkitRequestFullScreen();
//       //      el3.webkitRequestFullScreen();

//       //  }
//       // else {
//       //    el.mozRequestFullScreen();
//       //    el2.mozRequestFullScreen();
//       //    el3.mozRequestFullScreen();
//       // }

//         CVS_G.height = window.innerHeight;
//         CVS_G.width  = CVS_G.height*2;
//         CVS_M.height = window.innerHeight;
//         CVS_M.width  = CVS_M.height*2;
//         CVS_BG.height = window.innerHeight;
//         CVS_BG.width  = CVS_BG.height*2;
//         GAMEWIDTH     = CVS_M.width;
//         GAMEHEIGHT    = CVS_M.height;
//         init();

// }

// CVS_G.addEventListener("click",fullscreen);
// CVS_M.addEventListener("click",fullscreen);
// CVS_BG.addEventListener("click",fullscreen);

} /* End Game Scope */

