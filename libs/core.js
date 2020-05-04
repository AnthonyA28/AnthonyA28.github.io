"use strict";


function clone(object) {
    let string =  JSON.stringify(object);
    return JSON.parse(string);
}




function init_pixMap(numpixels_x, numpixels_y) {
    let local_pixMap = [];
    let i,j;
    for (i = 0; i < numpixels_x; i ++ ){
        let row = [];
        for (j = 0; j < numpixels_y; j ++ ){
            row.push([-1,0]);
        }
        local_pixMap.push(row);
    }
    return local_pixMap;
}

function init_pixMaps(num, pix_x, pix_y) {
    let pixMaps = [];
    let m; let i; let j;
    for(m=0; m < num; m ++ ) {
        pixMaps.push(init_pixMap(pix_x, pix_y));
    }
    return pixMaps;
}



// function colorNumToStr(color) {
//     if( color == undefined ) {
//         console.log("ERROR: colorNumToStr(color==UNDEFINED). -> '000000' ");
//         return '000000';
//     }
//     return fmtNumLen(color.toString(16),6)
// }

// function colorStrToNum(color) {
//     if( color == undefined ) {
//         console.log("ERROR: colorStrToNum(color==UNDEFINED). -> 0");
//         return 0;
//     }
//     return parseInt(color,16);
// }

function fmtNumLen(num, length) {
    let r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
            return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
    };
}




function get_pixel_pos(absPos, pix_map, canvaswidth, canvasheight) {
    let pixelwidth  = Math.floor(canvaswidth/pix_map.length);
    let pixelheight = Math.floor(canvasheight/pix_map[0].length);
    let x_abs       = absPos.x-absPos.x%pixelwidth;
    let y_abs       = absPos.y-absPos.y%pixelheight;
    let x_pix       = Math.floor(x_abs/pixelwidth);
    let y_pix       = Math.floor(y_abs/pixelheight);
    return { x:x_pix, y:y_pix};
}



/* "" means dont change color 
    NaN means dont change flag 
*/
function fill_pixel(pos, pix_map, color="", flag=NaN, width=1, mirror_horiz=false, mirror_vert=false) {
    let numpixels_x = pix_map.length;
    let numpixels_y = pix_map[0].length;
    let x_pix, y_pix; // current pixel being changed

    if( mirror_vert || mirror_horiz){
        for (x_pix = pos.x; x_pix < pos.x + width; x_pix++){
            for (y_pix = pos.y; y_pix < pos.y + width; y_pix++){
                if ( x_pix >= numpixels_x || y_pix >= numpixels_y || x_pix < 0 || y_pix < 0)  continue; 
                if (!(color=="") ){
                    pix_map[x_pix][y_pix][0]=color;  
                    if( mirror_horiz){
                        pix_map[numpixels_x-1-x_pix][y_pix][0]=color;  
                    }
                    if( mirror_vert ){
                        pix_map[x_pix][numpixels_y-1-y_pix][0]=color;  
                    }
                    if( mirror_horiz && mirror_vert ){
                           pix_map[numpixels_x-1-x_pix][numpixels_y-1-y_pix][0]=color;  
                    }
                } 
                if (!isNaN(flag)  ) {
                    pix_map[x_pix][y_pix][1]=flag;
                    if( mirror_horiz){
                        pix_map[numpixels_x-1-x_pix][y_pix][1]=flag;  
                    }
                    if( mirror_vert ){
                        pix_map[x_pix][numpixels_y-1-y_pix][1]=flag;  
                    }
                    if( mirror_horiz && mirror_vert ){
                           pix_map[numpixels_x-1-x_pix][numpixels_y-1-y_pix][1]=flag;  
                    }
                }
            }
        }
        return;
    }

    /* No mirroring */
    for (x_pix = pos.x; x_pix < pos.x + width; x_pix++){
        for (y_pix = pos.y; y_pix < pos.y + width; y_pix++){
            if ( x_pix >= numpixels_x || y_pix >= numpixels_y || x_pix < 0 || y_pix < 0)  continue; 
            if (!(color=="") ) pix_map[x_pix][y_pix][0]=color;
            if (!isNaN(flag)  ) pix_map[x_pix][y_pix][1]=flag;
        }
    }
}

function reset_map(map) {
    if( map == undefined ) {
        console.log("ERROR: reset_map(map==undefined) -> Not Resetting.")
        return; 
    }
    let i=0;
    let j=0;
    let numpixels_x = map.length;
    let numpixels_y = map[0].length;
    for (i = 0; i < numpixels_x; i ++ ){
        for (j = 0; j < numpixels_y; j ++ ){
            // map[i][j][0] = [-1,0];
            map[i][j][0] = "-1";
            map[i][j][1] = 0;
        }
    }
}

function stamp(pixPos, dest, source, flip_horiz=false, flip_vert=false, flag_only=false, paint_only=false) {
    let x = Math.floor(pixPos.x);
    let xi = 0;
    let numpixels_x = dest.length;
    let numpixels_y = dest[0].length;
    for (;xi < source.length ; xi++ ) {
        let yi = 0;
        let y = Math.floor(pixPos.y);
        for (; yi < source[xi].length; yi++ ) {
            let source_x = xi; 
            let source_y = yi;
            if ( flip_horiz ) source_x = source.length-xi-1;
            if ( flip_vert )  source_y = source[0].length-yi-1;
            if( !( (x < numpixels_x) && (y < numpixels_y) && (x >= 0) && (y >= 0) ) ){
                y++;
                continue;
            }
            let color   = source[source_x][source_y][0];
            let curFlag = source[source_x][source_y][1];

            if( color == "-1") {
                color = "";
            }
            if( paint_only ) curFlag = NaN;
            if( flag_only )  color = "";
            
            if(flip_horiz) {
                fill_pixel({x:x,y:y}, dest, color, curFlag, 1);
            } else {
                fill_pixel({x:x,y:y}, dest, color, curFlag, 1);
            }
            y++;
        }
        x++;
    }
}

function clone_slice(p1, p2, source) {
	let cloned = [];
	if(p1.x > p2.x) {
	    let x = p2.x;
	    p2.x = p1.x;
	    p1.x = x;
	}
	if(p1.y > p2.y) {
	    let y = p2.y;
	    p2.y = p1.y;
	    p1.y = y;
	}

	let x = p1.x;
	for (;x <= p2.x; x ++) {
	    let y = p1.y;
	    let row = [];
	    for (; y<= p2.y; y ++) {
	        let tmp = [];
	        Object.assign(tmp, source[x][y]);
	        row.push(tmp);
	    }
	    cloned.push(row);
	}
	return cloned; 
}


function draw_pixmap(canvas, pix_map, alpha=1, numpx_x=0, numpx_y=0, pos_x =0, pos_y =0, flip=false){
    let cxt         = canvas.getContext("2d");
    cxt.globalAlpha = alpha;
    let canvaswidth = canvas.width;
    let canvasheight = canvas.height;
    let numpixels_x = pix_map.length;
    let numpixels_y = pix_map[0].length;
    let pixelwidth ;
    let pixelheight;
    if((numpx_x==0)) {
    	pixelwidth = Math.floor(canvaswidth/numpixels_x);
    } else {
    	pixelwidth = Math.floor(canvaswidth/numpx_x);
    }
	if((numpx_y==0)) {
		pixelheight = Math.floor(canvasheight/numpixels_y);
	} else {
		pixelheight = Math.floor(canvasheight/numpx_y);
	}
    

    let i, j, source_x, color, fs ;
    for (i = 0; i < numpixels_x; i ++ ){
        for (j = 0; j < numpixels_y; j ++ ){
        		source_x = i;
				if ( flip ) source_x = pix_map.length-i-1;
                color = pix_map[source_x][j][0];
                if( color == "-1" )  continue;
                fs = '#'+ color;
                cxt.fillStyle  = fs; 
                cxt.fillRect((i +pos_x )*pixelwidth, (j + pos_y)*pixelheight, pixelwidth, pixelheight);
        }
    }
    cxt.globalAlpha = 1;
}

function draw_pixmap_flagged(canvas, pix_map, flag=-1, alpha=1, numpx_x=0, numpx_y=0, pos_x =0, pos_y =0, flip=false){
    let cxt         = canvas.getContext("2d");
    let canvaswidth = canvas.width;
    let canvasheight = canvas.height;
    let numpixels_x = pix_map.length;
    let numpixels_y = pix_map[0].length;
    let pixelwidth ;
    let pixelheight;
    if((numpx_x==0)) {
        pixelwidth = Math.floor(canvaswidth/numpixels_x);
    } else {
        pixelwidth = Math.floor(canvaswidth/numpx_x);
    }
    if((numpx_y==0)) {
        pixelheight = Math.floor(canvasheight/numpixels_y);
    } else {
        pixelheight = Math.floor(canvasheight/numpx_y);
    }
    

    let i, j, source_x, color, fs ;
    for (i = 0; i < numpixels_x; i ++ ){
        for (j = 0; j < numpixels_y; j ++ ){
                color = pix_map[i][j][0];    
                
                if ( pix_map[i][j][1] < 1 ) {
                    continue;
                } else if (pix_map[i][j][1] & flag  ) {
                    cxt.globalAlpha = 1*alpha;
                } else {
                    cxt.globalAlpha = 0.3*alpha;
                }
                fs = '#000000';//+ fmtNumLen(color.toString(16),6);
                cxt.fillStyle  = fs; 
                cxt.fillRect((i +pos_x )*pixelwidth, (j + pos_y)*pixelheight, pixelwidth, pixelheight);
        }
    }
    cxt.globalAlpha = 1;
}




function draw_grid(canvas, pix_map, alpha=1){
    let cxt         = canvas.getContext("2d");
    cxt.globalAlpha = alpha;
    let numpixels_x = pix_map.length;
    let numpixels_y = pix_map[0].length;
    let canvasheight = canvas.height;
    let canvaswidth = canvas.width;
    let pixelwidth  = Math.floor(canvaswidth/numpixels_x);
    let pixelheight = Math.floor(canvasheight/numpixels_y);
    let i;
    for(i=0; i < numpixels_x; i++) {
        
        if ( i%16==0 ) cxt.lineWidth=3;
        else if( i%8==0 ) cxt.lineWidth=2;
        else cxt.lineWidth=1;
        cxt.beginPath();
        cxt.moveTo(i*pixelwidth, 0);
        cxt.lineTo(i*pixelwidth, canvasheight);
        cxt.stroke();
    }
    for(i=0; i < numpixels_y; i++) {
        if ( i%16==0 ) cxt.lineWidth=3;
        else if( i%8==0 ) cxt.lineWidth=2;
        else cxt.lineWidth=1;
        cxt.beginPath();
        cxt.moveTo(0, i*pixelheight);
        cxt.lineTo(canvaswidth, i*pixelheight);
        cxt.stroke();
    }
    cxt.globalAlpha = 1;
}




function inMap(x,y, map) {
    x = Math.floor(x);
    y = Math.floor(y);
    let numpixels_x = map.length;
    let numpixels_y = map[0].length;
    return ( (x < numpixels_x) 
            && (y < numpixels_y) 
            && (x >= 0) 
            && (y >= 0) 
        ); 
}



function draw_text_info(canvas, gameHeight, text) {
    let cxt = canvas.getContext("2d");
    cxt.clearRect(0, gameHeight, canvas.width, canvas.height-gameHeight);
    let fontSize = Math.floor(canvas.height/30);
    cxt.font = fontSize + 'pt Calibri';
    cxt.fillStyle = 'black';
    cxt.fillText(text, 2, canvas.height - fontSize - 2);
}


/***
    Input flag code
*/
function fmap(x, y, map, flag) {
    x = Math.floor(x);
    y = Math.floor(y);
    if( !(inMap(x,y, map))) {
        console.log("ERROR: fmap x or y out of map bounds. Returning false.");
        return false; 
    }
    if( map[x][y][1] & ((1 << (flag) >>> 1) ) ){
    	// console.log("map[x][y][1] == " + map[x][y][1] + " flag == " + flag );
        return true; 
    } 
    return false; 
}

/***
	Find the left topmost flag in map
*/
function findFlag(flag, map){
	let x = 0;
	let y = 0;
	let numpixels_x = map.length;
	let numpixels_y = map[0].length;
	for(x=0; x<numpixels_x; x ++ ) {
		for(y=0; y<numpixels_y; y ++ ) {
			if( fmap(x,y,map, flag) ) {
				return {x,y};
			}
		}
	}
	let center_x = 0;//Math.floor(numpixels_x/2);
	let center_y = 0;//Math.floor(numpixels_y/2);
	return {center_x, center_y};
}

/***
    Check all corners of OBJ to see if they are within MAPs FLAG
    returns true if ANY cornor of OBJ in in MAPs flag
*/
function fobjmap(x, y, obj, map, flag) {
	x = Math.floor(x);
	y = Math.floor(y);
    let len_x = obj.length;
    let len_y = obj[0].length;
    if( fmap(x,         y,         map, flag) ) return true; 
    if( fmap(x+len_x-1, y,         map, flag) ) return true; 
    if( fmap(x,         y+len_y-1, map, flag) ) return true; 
    if( fmap(x+len_x-1, y+len_y-1, map, flag) ) return true; 
    return false; 
}

/***
    Check all corners of OBJ to see if they are within MAPs range
    returns true if ALL cornor of OBJ is out of range
*/
function inobjMap(x, y, obj, map, flag) {
	x = Math.floor(x);
	y = Math.floor(y);
    let len_x   = obj.length;
    let len_y   = obj[0].length;
    // let range_x = map.length;
    // let range_y = map[0].length;
    if( !inMap(x,          y,         map) ) return false; 
    if( !inMap(x+len_x-1,  y,         map) ) return false; 
    if( !inMap(x,          y+len_y-1, map) ) return false; 
    if( !inMap(x+len_x-1,  y+len_y-1, map) ) return false; 
    return true; 
}


var get_fps = (function () {
    let t_i    = new Date();
    let fps    = 0;
    let frames = 0;
    return function () {
        frames += 1;
        let t_f = new Date();
        let duration = (t_f - t_i);
        if( duration > 1000 ) {
            fps = Math.floor(frames/(duration/1000));
            t_i = new Date();
            frames = 0;
        }
        return fps;
    }
})();



function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))


//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    var channelA = colorChannelA*amountToMix;
    var channelB = colorChannelB*(1-amountToMix);
    return parseInt(channelA+channelB);
}

//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
function colorMixer(rgbA, rgbB, amountToMix){
    var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
    var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
    var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
    return [r,g,b];
    // return "rgb("+r+","+g+","+b+")";
}

/*

    get_duration = (function() {
    let t_start = new Date();
    return function () {
        let t_now = new Date();
        return Math.floor( ( t_now - t_start));
    }
    })();

*/