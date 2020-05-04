/*
global
    getMousePos,
    get_pixel_pos,
    hexToRgb,
    colorMixer,
    rgbToHex,
    inMap,
    fmap,
    findFlag,
    fobjmap,
    clone,
    get_fps:
true
*/

/*
exported
    gaming_mode,
    game_keypress_fn,
*/


"use strict";
var gaming_mode = true;
var game_keypress_fn; // a global pointer to a scoped function

// (function()
/* Scoped */
{


var GAME_JSON; // Will resolve to that in data.js or undefined
let P;
let CVS; // for the Game/player
let G_keys = [];
let GAMEWIDTH;
let GAMEHEIGHT;

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

let backgroundImage;
let MPS;




var __INIT_INFO = function () {
    var INIT_RESULT = true;
    /* GAME_JSON was initialized from data.js it will be defined */
    if ( document.getElementById("json") != undefined ) {
        GAME_JSON = document.getElementById("json").value;
        if (GAME_JSON === '' || GAME_JSON === undefined){
            INIT_RESULT = false;
            window.alert("ERROR: NO GAME INFORMATION! Ensure valid game information is encoded in JSON in 'data.js'");
            return INIT_RESULT;
        }
    }

    /* Initialize only if the JSON info is found. */
    P             = JSON.parse(GAME_JSON);
    MPS = new Array(P.length);
    CVS         = document.getElementById("Canvas");
    GAMEWIDTH     = CVS.width;
    GAMEHEIGHT    = CVS.height;
    return INIT_RESULT;
};



var keyClicked = function(clicked){

    // let y_prev =  player.y;
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
    if( clicked[90] && (!inMap( player.x, player.y+P[player.minSpr][0].length, P[map.curSpr], 1) ||fmap(player.x, player.y+P[player.minSpr][0].length, P[map.curSpr], 1) ||fmap(player.x+P[player.minSpr].length, player.y+P[player.minSpr][0].length, P[map.curSpr], 1))
    ) {
        // player.y -=5;
        player.jump_set = 10;
        if( G_keys[38] ){
            player.jump_set += 10;
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
    draw_M();

};



var iter_spr = function (time_now, obj){
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
};


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
};



var reset_PARTICLES = function () {

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

};

//Function to move the_PARTICLESflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
var update_PARTICLES = function () {
    if(G_partMode == "rain"){
        if( Math.floor(Math.random() + 0.000005)) {
            G_partMode = "snow";
            reset_PARTICLES();
        }
    } else if (G_partMode == "snow"){
        if (Math.floor(Math.random() + 0.000005)) {
            G_partMode = "";
            reset_PARTICLES();
        }
    }else if (G_partMode === "") {
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
};


var TREE_reset = function (tree1){
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
    tree1.growthRate, tree1);
};




var draw_BG = function (){
    let cxt = CVS.getContext("2d");
    // cxt.clearRect(0,0,GAMEWIDTH, GAMEHEIGHT);
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
        cxt = CVS.getContext("2d");
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


};

function mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false){
    ctx.save();  // save the current canvas state
    ctx.setTransform(
        horizontal ? -1 : 1, 0, // set the direction of x axis
        0, vertical ? -1 : 1,   // set the direction of y axis
        x + horizontal ? image.width : 0, // set the x origin
        y + vertical ? image.height : 0   // set the y origin
    );
    ctx.drawImage(image,0,0);
    ctx.restore(); // restore the state as it was when this function was called
}

var draw_G = function () {
    let cxt = CVS.getContext("2d");

    var newCanvas = document.getElementById("Canvas_tmp");



    newCanvas.getContext("2d").clearRect(0,0,newCanvas.width, newCanvas.height);

    cxt.font = '12pt Calibri';
    cxt.fillStyle = 'black';
    cxt.fillText(G_message, 2, 12);
    G_message = '';


    cxt = CVS.getContext("2d");
    newCanvas.getContext("2d").clearRect(0,0,newCanvas.width, newCanvas.height);
    cxt.save();
    cxt.scale(Math.floor(CVS.width/MPS[map.curSpr].width),Math.floor(CVS.height/MPS[map.curSpr].height));
    let t=0;
    for(; t<trees.length; t++){
        if( trees[t].map == map.curSpr){
            newCanvas.getContext("2d").putImageData(MPS[trees[t].curSpr], trees[t].x, trees[t].y);

        }
    }
    cxt.drawImage(newCanvas,  0, 0);
    cxt.restore();

    cxt.save();
    cxt.scale(Math.floor(CVS.width/MPS[map.curSpr].width),Math.floor(CVS.height/MPS[map.curSpr].height));
    newCanvas.getContext("2d").putImageData(MPS[player.curSpr], MPS[map.curSpr].width/2, player.y);
    cxt.drawImage(newCanvas,  0, 0);
    cxt.restore();




};


function export_json_stamp_to_ppm(json){
    let x,y;
    let text = "P3\n"
    text += "# PXMP STAMPED GAMEINFO in P3 format.\n"
    text += json.length + " " + json[0].length + "\n" ; // width and height
    text += "255\n";

    for(y =0; y < json[0].length; y ++ ){
        for(x =0; x < json.length; x ++ ){
            let rgb = ((json[x][y][0]));
            rgb = rgb.toString();
            // console.log(rgb);
            if( rgb.includes('-') ){
                text += "-1\n-1\n-1\n";
            } else {
                let num = parseInt(rgb.substring(0,2),16);
                text +=  fmtNumLen(num, 3) + "\n"
                num = parseInt(rgb.substring(2,4),16);
                text +=  fmtNumLen(num, 3) + "\n"
                num = parseInt(rgb.substring(4,6),16);
                text +=  fmtNumLen(num, 3) + "\n"

            }
        }

    }
    return text;
}


function scaleImageData(imageData, scale, ctx) {
    var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
    var subLine = ctx.createImageData(scale, 1).data
    for (var row = 0; row < imageData.height; row++) {
        for (var col = 0; col < imageData.width; col++) {
            var sourcePixel = imageData.data.subarray(
                (row * imageData.width + col) * 4,
                (row * imageData.width + col) * 4 + 4
            );
            for (var x = 0; x < scale; x++) subLine.set(sourcePixel, x*4)
            for (var y = 0; y < scale; y++) {
                var destRow = row * scale + y;
                var destCol = col * scale;
                scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4)
            }
        }
    }

    return scaled;
}





function PPM_to_ImageData(value, canvas){

    let lines = value.split("\n");

    if( lines[0].includes("p3") || lines[0].includes("P3") ){
        /*Importing a ppm file */
        console.log("Importing p3 ppm file.");

        let n = 1;
        while( lines[n].includes("#") ) {
            console.log(lines[n]);
            n ++;
        }
        let cols = parseInt(lines[n].split(" ")[0]);
        let rows = parseInt(lines[n].split(" ")[1]);

        let cxt = canvas.getContext("2d");
        var image = cxt.createImageData(cols, rows);

        n++;
        let maxInt = parseInt(lines[n]);
        n++;


        let y, x, str;
        console.log( rows + " pix Horizontal , " + cols + " pix Vertical");
        // let newMap = [];
        let index = 0;
        let imageData = new Uint8ClampedArray(rows*cols*4);
        for(y =0; y < rows; y ++ ){
            for(x =0; x < cols; x ++ ){
                if(lines[n]=="-1"){
                    imageData[index] = 0;
                    imageData[index+1] = 0;
                    imageData[index+2] = 0;
                    imageData[index+3] = 0;
                    index+=4;
                    n+= 3;
                    continue;
                }
                let r = parseInt(lines[n]);
                imageData[index] = r;
                n ++; index++;
                let g = parseInt(lines[n]);
                imageData[index] = g;
                n ++; index++;
                let b = parseInt(lines[n]);
                imageData[index] = b;
                n++; index++;
                imageData[index] = 255; //alpha
                index++;
                // let rgb = {r: r, g: g, b: b};
                // newMap.push(rgb);
                // console.log(rgb);
            }
        }

        image.data.set(imageData);
        // image = scaleImageData(image, Math.floor(canvas.width/image.width) , cxt);
        // scaled = CXT.createImageData(cols*4, rows*4);
        // scaled.data.set(image.data);

        return image;
    }
}


var draw_M = function () {
    let cxt = CVS.getContext("2d");
    // cxt.clearRect(0,0,GAMEWIDTH, GAMEHEIGHT);

    // cxt.putImageData(backgroundImage, 0, 0);

    cxt.save();
    var newCanvas = document.getElementById("Canvas_tmp");
    newCanvas.getContext("2d").putImageData(MPS[map.curSpr], 0, 0);
    cxt.scale(Math.floor(CVS.width/MPS[map.curSpr].width),Math.floor(CVS.height/MPS[map.curSpr].height));
    cxt.drawImage(newCanvas,30-player.x,0);
    newCanvas.getContext("2d").clearRect(0,0,MPS[map.curSpr].width, MPS[map.curSpr].height);
    cxt.restore();



};



var init = function (){

    /****
    Global Variables.
 **/
    angle = 0;
    G_message   = "";
    if( Math.floor(Math.random() + 0.33) ) {
        G_partMode = "rain";
    } else if ( Math.floor(Math.random() + 0.5)){
        G_partMode = "snow";
    } else {
        G_partMode = "";
    }


    map = {
        curSpr: 2,
    };

    flag        = 0;

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
    };

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
    };
    TREE_reset(tree1);
    trees.push(tree1);

    reset_PARTICLES();


    let i =0;
    let ppm;
    let image;
    for(; i < P.length; i ++ ){
        if( P[i].length == 1 && P[i][0].length == 1 || P[i][0].length < 1 || P[i].length < 1) continue;
        console.log(i);
        ppm = export_json_stamp_to_ppm(P[i], 2)
        image = PPM_to_ImageData(ppm, CVS );
        MPS[i] = (image);

    }

    let CXT_M           = CVS.getContext("2d");
    let CXT_G           = CVS.getContext("2d");
    let CXT_G2           = CVS.getContext("2d");
    let CXT_BG           = CVS.getContext("2d");

    CXT_M.webkitImageSmoothingEnabled = false;
    CXT_M.mozImageSmoothingEnabled = false;
    CXT_M.imageSmoothingEnabled = false;
    CXT_G.webkitImageSmoothingEnabled = false;
    CXT_G.mozImageSmoothingEnabled = false;
    CXT_G.imageSmoothingEnabled = false;
    CXT_G2.webkitImageSmoothingEnabled = false;
    CXT_G2.mozImageSmoothingEnabled = false;
    CXT_G2.imageSmoothingEnabled = false;

    CXT_BG.webkitImageSmoothingEnabled = false;
    CXT_BG.mozImageSmoothingEnabled = false;
    CXT_BG.imageSmoothingEnabled = false;



    draw_M();// clear all screens

    window.requestAnimationFrame(GAMELOOP);

    CVS.addEventListener('mousemove', function(evt) {
        let mousePos = getMousePos(CVS, evt);
        G_pixPos = get_pixel_pos(mousePos, P[map.curSpr], CVS.width, CVS.height);
    }, false);


};





/***
    The main drawing function.
    Called at each refresh.
    Use it to draw all the relavent maps and sprites.
*/
var __draw = function() {
    draw_BG();
    draw_M();
    draw_G();
};

/***
    The main action function.
    All that should have occured between time_now and time_now - G_delta
    should be placed here.
*/
let time_prev=0;
var __update = function(time_now){
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
    // const y_prev = player.y;
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
    if( !inMap(player.x,player.y+P[player.minSpr][0].length-1, P[map.curSpr]) || fmap(player.x, player.y, P[map.curSpr],  1) || fmap(player.x+P[player.minSpr].length-1, player.y,P[map.curSpr],  1)) {
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


    let it = 0;
    while( !inMap(player.x, player.y+P[player.minSpr][0].length-1, P[map.curSpr]) || fmap(player.x, player.y+P[player.minSpr][0].length-1, P[map.curSpr], 1) || fmap(player.x+P[player.minSpr].length-1, player.y+P[player.minSpr][0].length-1,P[map.curSpr],  1) ){
        player.y -= 1 ;
        it += 1;
        if( it > 10000 ) {
            window.console.log("Warning, character reached max iterations.");
            break;
        }
    }


    G_message += ' t: ' + time_now + ', ' ;
    G_message += ' Dt: ' + G_delta + '. ';
    G_message += ' fps:' + get_fps();
    G_message += ' PlayerPos( x:' + player.x + ', y :' + player.y + '), ';
    G_message += ' pixPos( x: ' + G_pixPos.x + ', y: ' + G_pixPos.y + ')';
};

/***
 The callback function called every G_delta
 */
var GAMELOOP = function (time) {
    __update(time);
    __draw();
    window.requestAnimationFrame(GAMELOOP);
};



/* Press the Play Button by default*/
document.getElementById("play_game").onclick = function() {
    if( __INIT_INFO() ) {
        init();
    }
};

document.getElementById("play_game").dispatchEvent(new MouseEvent("click"));

}//)(); /* End Game Scope */




