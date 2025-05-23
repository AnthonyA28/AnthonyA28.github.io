---
layout: tool
title: Time Temperature Superposition
tags: Tools
section: article
---


# Time Temperature Superposition


Rheological data can be transformed so that the effect of temperature is removed. The data is shifted along the time axes, and the effect is quantified by the shifting variable $a$. The $a_T$s at each temperature are then fit to the following equation [^WLF]: $ Log(a_T) = -\frac{C_1(T-T_r)}{C_2 + T - T_r} $. 

The data can also be shifted along the vertical axes to with the $b$ variable. 

Use the sliders below to adjust the $a$s and $b$s at different temperatures. The number left to each slider is the base unit that the slider value is multipled by (lower this if a needs to be very small). Export the example data by clicking 'Export Data' to see the formatting convention. Then upload your own data by clicking, or dragging and dropping, the 'Choose File' button.  





<!-- <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script> -->

<!-- <script type="text/x-mathjax-config"> MathJax.Hub.Config({ "HTML-CSS": { scale: 1.3, linebreaks: { automatic: true } },SVG: { font: "STIX General" },displayAlign: "left" });</script> -->
<script src="/assets/plotter/deps/papaparse.js"></script>
<script src="/assets/plotter/deps/Inputer.js"></script>
<script src="/assets/plotter/deps/Options.js"></script>
<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js"></script>






<style type="text/css">

  .collapsible {
    color: #000;
    background-color: #FFF;
    border: none;
    text-align: right;
    font-size: 13px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .active, .collapsible:hover {
    background-color: #aaa;
  }
</style>


<main class="content-wraper" id="content-wraper">

  <div id="wrapper" style="border: 0px solid #FFFFFF">


  
  <div style="display: inline-block;width:350px;height:3000px;border: 0px solid #FFFFFF; vertical-align: top;">
    <h2>

    </h2>

    

    <h2> New feature!  </h2>
    <button type="submit" id="autoshiftAts" > Set A<sub>T</sub>s to match G''</button>
    <button type="submit" id="autoshiftBts" > Shift B<sub>T</sub>s match G'  </button>
    <br>
    <button type="submit" id="resetShifts" > Reset:</button>

    <h5>Load Data: <input type="file" id="input_file"></h5>
    <h5>Export Data:  <button type="submit"  id="exportData" > Export Data</button></h5>
    
    <button type="submit" style="display:none" id="download" > Export json</button>




    <div id="TTS" ></div>
    <!-- <div id="appTTS" ></div> -->
  <!-- </div> -->
    <!-- <br> -->
      <!-- <button type="submit"  id="performTTS" > Fit constants</button>  -->
      <!-- <button type="submit"  id="save_template" > Save Template</button>  -->
      <!-- <button type="submit"  id="delete_template" > Delete Template</button>  -->
      <!-- <button type="submit"  id="make_default_template" > Make Default Template</button>  -->
          <!-- <button type="submit" id="save_template"> Save template </button>  -->
      <!-- <button type="submit" id="open_templates"> Open templates</button>  -->
      <div id="template_div" style="display:none"><strong>Choose Template:</strong> 
      </div>
      <div style="display:none"><strong>Update:</strong>
        Trace styles <input type="checkbox"  id="update_trace_styles_check" checked >
        <!-- Trace names  <input type="checkbox"  id="update_trace_names_check" >
        Axes labels  <input type="checkbox"  id="update_axes_labels_check" > -->
      </div>

    <br>
    
    <select id="palettes"  style="display:none">

      <option>pyDefault</option>
      <option>UTcolors</option>
      <option>Paired</option>
      <option>Dark2</option>
      <option>Pastel1</option>
      <option>Pastel2</option>
      <option>Set1</option>
      <option>Set2</option>
      <option>Set3</option>
      <option>tab10</option>
      <option>tab20</option>
      <option>tab20b</option>
      <option>tab20c</option>

      <option>viridis_</option>
      <option>viridis_r_</option>
      <option>magma_</option>
      <option>magma_r_</option>
      <option>plasma_</option>
      <option>plasma_r_</option>
      <option>cividis_</option>
      <option>cividis_r_</option>
      <option>mako_</option>
      <option>mako_r_</option>
      <option>rocket_</option>
      <option>rocket_r_</option>
      <option>inferno_</option>
      <option>inferno_r_</option>

    </select>
    <input type="number" style="display:none;" id="n_colors">  

    <div style="display:none">
    <h3>Layout:</h3>
    <div id="layout">
      <div id="app" ></div>
    </div>
    <div style="display:none">
    <h3>Master Trace:</h3>
    <div id="appM"></div>
    </div>
    </div>


<!--     <button type="submit" id="helper_reset_colors">Reset Colors</button> 
  
  <button type="submit" id="helper_pair_colors">Pair Colors</button> 


  <br>

  <button type="submit" id="helper_pair_markers">Pair Markers</button> 

  <button type="submit" id="helper_pair_linestyles">Pair Linestyles</button> 
  <br> -->


  </div>

  <div style="display: inline-block;width:410px;height:410px;border: 0px solid #FFFFFF; vertical-align:  top" id="gd_div">
    <div id="gd" ></div>
  </div>

  <div style="display: inline-block;width:350px;height:3000px;border: 0px solid #FFFFFF; vertical-align: top;">

    <!-- Data -->
    <div id="data" style="display:none">
      Data:
    </div>
  </div>



  <div style="display: inline-block;width:350px;height:3000px;border: 0px solid #FFFFFF; vertical-align: top;">


    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
      overflow:hidden;padding:10px 5px;word-break:normal;}
    .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
      font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
    .tg .tg-cly1{text-align:left;vertical-align:middle}
    .tg .tg-1wig{font-weight:bold;text-align:left;vertical-align:top}
    .tg .tg-m919{font-family:inherit;font-weight:bold;text-align:left;vertical-align:middle}
    .tg .tg-yla0{font-weight:bold;text-align:left;vertical-align:middle}
    .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    
  </div>

  </div>


</main>



<script >if (window.module) module = window.module;</script>
<!-- <script src="/assets/plotter/templates.js"></script> -->
<script>
var templates_list = [
    ["TTS",               '{"layout":{"showlegend":false,"legend":{"bordercolor":"#444","bgcolor":"rgba(255, 255, 255, 1)","xanchor":"left","yanchor":"middle","x":1.1,"y":0.5,"margin":{"autoexpand":true,"b":50,"l":50,"r":100,"t":50},"itemwidth":10},"xaxis":{"title":{"text":"","standoff":0},"range":[null,null],"type":"log","zeroline":false,"dtick":"1","exponentformat":"power","ticks":"inside","ticklen":"5","tickcolor":"#000000","linecolor":"#000000","mirror":"ticks","showgrid":false,"minor":{"dtick":"","ticks":"inside","ticklen":2,"tickcolor":"#000000"}},"yaxis":{"title":{"text":"","standoff":0},"range":[null,null],"type":"log","zeroline":true,"dtick":"1","tickformat":"","exponentformat":"power","tickmode":{},"ticks":"inside","ticklen":5,"tickcolor":"#000000","linecolor":"#000000","mirror":"ticks","showgrid":false,"minor":{"dtick":"","tickmode":"auto","ticks":"inside","ticklen":2,"tickcolor":"#000000"}},"margin":{"b":200,"l":77,"r":50,"t":200},"font":{"family":"Segoe UI","size":18,"color":"#000000"},"width":800,"height":1200},"traces":[{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.0999951,0.0999951,0.0999951,0.0999951,0.0999951,0.0999951,0.0999951],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"circle","color":"#fe9f6d"},"line":{"shape":"spline","dash":"solid","width":1,"color":"#fe9f6d"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.1,0.1,0.1,0.1,0.1,0.1,0.1]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"circle-open","color":"#fe9f6d"},"line":{"shape":"spline","dash":"dot","width":1,"color":"#fe9f6d"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.001,0.01,0.1,1,10,100,1000]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.113994414,0.113994414,0.113994414,0.113994414,0.113994414,0.113994414,0.113994414],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"square","color":"#de4968"},"line":{"shape":"spline","dash":"solid","width":1,"color":"#de4968"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.114,0.114,0.114,0.114,0.114,0.114,0.114]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.0004999755,0.004999755000000001,0.04999755,0.4999755,4.999755,49.997550000000004,499.9755],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"square-open","color":"#de4968"},"line":{"shape":"spline","dash":"dot","width":1,"color":"#de4968"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.0005,0.005,0.05,0.5,5,50,500]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.12995363196,0.12995363196,0.12995363196,0.12995363196,0.12995363196,0.12995363196,0.12995363196],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"diamond","color":"#8c2981"},"line":{"shape":"spline","dash":"solid","width":1,"color":"#8c2981"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.12996,0.12996,0.12996,0.12996,0.12996,0.12996,0.12996]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.00024998775,0.0024998775000000003,0.024998775,0.24998775,2.4998775,24.998775000000002,249.98775],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"diamond-open","color":"#8c2981"},"line":{"shape":"spline","dash":"dot","width":1,"color":"#8c2981"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.00025,0.0025,0.025,0.25,2.5,25,250]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.1481471404344,0.1481471404344,0.1481471404344,0.1481471404344,0.1481471404344,0.1481471404344,0.1481471404344],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"triangle-up","color":"#3b0f70"},"line":{"shape":"spline","dash":"solid","width":1,"color":"#3b0f70"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.1481544,0.1481544,0.1481544,0.1481544,0.1481544,0.1481544,0.1481544]},{"x":[0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001,999.951],"y":[0.00009999510000000001,0.000999951,0.009999510000000001,0.0999951,0.999951,9.99951,99.99510000000001],"visible":true,"name":"","type":"scatter","mode":"lines+markers","marker":{"size":8,"symbol":"triangle-up-open","color":"#3b0f70"},"line":{"shape":"spline","dash":"dot","width":1,"color":"#3b0f70"},"base_x":[0.001,0.01,0.1,1,10,100,1000],"base_y":[0.0001,0.001,0.01,0.1,1,10,100]}],"palette":"4_magma_r_"}']
]

</script>
<script>

let global_header = ["Angular Frequency","Storage Modulus","Loss Modulus","","Angular Frequency","Storage Modulus","Loss Modulus","","Angular Frequency","Storage Modulus","Loss Modulus","","Angular Frequency","Storage Modulus","Loss Modulus"];

document.getElementById('exportData').addEventListener('click', function() {

  let header = [...global_header];

  for(let i = 0; i < inputer_TTS.length; i += 1){
    let T = inputer_TTS[i].inputs['Temperature [C]'].elem.value;
    let a = (parseFloat(inputer_TTS[i].inputs['a'].elem.value)*parseFloat(inputer_TTS[i].inputs['a'].elem_base.value)).toFixed(10);
    let b = (parseFloat(inputer_TTS[i].inputs['b'].elem.value)*parseFloat(inputer_TTS[i].inputs['b'].elem_base.value)).toFixed(10);
    console.log(a);
    console.log(b);
    header[i*4] = header[i*4] + "T: " + T  + " a:" + a + " b:" + b
  }

  let dataArrays = []

  let max_trace_length = 0;
  for(let i = 0; i < traces.length; i += 2){
    dataArrays.push(traces[i].x)
    dataArrays.push(traces[i].y)
    dataArrays.push(traces[i+1].y)
    let len = traces[i].x.length;
    if(len > max_trace_length){
      max_trace_length = len;
    }
  }

  const combinedData = [];

  for (let i = 0; i < max_trace_length; i++) {
    const rowData = [];
    for (let j = 0; j < dataArrays.length; j++) {
       rowData.push(dataArrays[j][i] || ''); // Insert data or an empty string if data is missing
    if ((j + 1) % 3 === 0 && j !== dataArrays.length - 1) {
        // Insert an empty column after every 3rd column except the last one
        rowData.push('');
      }
    }
    combinedData.push(rowData.join(','));
  }


  // Combine headers and rows
  const csv = [header, ...combinedData].join('\n');

  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: 'text/csv' });

  // Create a download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'TTS.csv';

  // Trigger the download
  document.body.appendChild(a);
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
});

function exp10Array(logArr) {
  return logArr.map(val => Math.pow(10, val));
}


var log10Array = function (arr){
  newarr = []
  for(var i = 0; i < arr.length; i ++ ){
    newarr.push(log10(arr[i]))
  }
  return newarr
}

var log10 = function (y) {
  return Math.log(y) / Math.log(10);
}

function minMaxNormalize(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return arr.map(val => (val - min) / (max - min));
}

function interpolate(x, y, xnew) {
  const ynew = [];
  for (let xi of xnew) {
    if (xi <= x[0]) {
      ynew.push(y[0]);
    } else if (xi >= x[x.length - 1]) {
      ynew.push(y[y.length - 1]);
    } else {
      for (let i = 0; i < x.length - 1; i++) {
        if (xi >= x[i] && xi <= x[i + 1]) {
          const t = (xi - x[i]) / (x[i + 1] - x[i]);
          ynew.push(y[i] * (1 - t) + y[i + 1] * t);
          break;
        }
      }
    }
  }
  return ynew;
}

function sortXY(x, y) {
  const combined = x.map((val, i) => ({ x: val, y: y[i] }));
  combined.sort((a, b) => a.x - b.x);
  return {
    x: combined.map(p => p.x),
    y: combined.map(p => p.y)
  };
}

function findNearestIndex(arr, target) {
  let minDiff = Infinity;
  let minIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - target);
    if (diff < minDiff) {
      minDiff = diff;
      minIndex = i;
    }
  }
  return minIndex;
}

function totalError(arx1, ary1, arx2, ary2, a) {
  const scaledX2 = arx2.map(val => val - a);
  const minX1 = Math.min(...arx1);

  let error = 0;
  let count = 0;

  for (let i = 0; i < scaledX2.length; i++) {
    const x2 = scaledX2[i];

    // Skip points that are outside the domain of the reference x-axis
    if (x2 < minX1) continue;

    const nearestIndex = findNearestIndex(arx1, x2);
    const diff = ary2[i] - ary1[nearestIndex];
    error += diff * diff;
    count++;
  }

  return count > 0 ? error / count : Infinity;
}

function findBestScalingFactorLog(arx1, ary1, arx2, ary2, aMin, aMax, steps = 1000) {
  const logMin = Math.log10(aMin);
  const logMax = Math.log10(aMax);

  let bestA = aMin;
  let minError = Infinity;

  for (let i = 0; i <= steps; i++) {
    const logA = logMin + (logMax - logMin) * (i / steps);
    const a = Math.pow(10, logA);

    const err = totalError(arx1, ary1, arx2, ary2, a);
    // console.log(`a: ${a}, ${err}`);  // Optional: log error trace

    if (err < minError) {
      minError = err;
      bestA = a;
    }
  }

  return bestA;
}


function totalErrorB(arx1, ary1, arx2, ary2, b) {
  const scaledary2 = ary2.map(val => val - b);
  // const scaledX2 = arx2.map(val => val - a);
  const minX1 = Math.min(...arx1);

  let error = 0;
  let count = 0;

  for (let i = 0; i < scaledary2.length; i++) {
    // const x2 = scaledX2[i];
    const x2 = arx2[i]; 

    // Skip points that are outside the domain of the reference x-axis
    if (x2 < minX1) continue;

    const nearestIndex = findNearestIndex(arx1, x2);
    const diff = scaledary2[i] - ary1[nearestIndex];
    error += diff * diff;
    count++;
  }

  return count > 0 ? error / count : Infinity;
}

function findBestScalingFactorLogB(arx1, ary1, arx2, ary2, aMin, aMax, steps = 1000) {
  const logMin = Math.log10(aMin);
  const logMax = Math.log10(aMax);

  let bestA = aMin;
  let minError = Infinity;

  for (let i = 0; i <= steps; i++) {
    const logA = logMin + (logMax - logMin) * (i / steps);
    const a = Math.pow(10, logA);

    const err = totalErrorB(arx1, ary1, arx2, ary2, a);
    console.log(`b: ${a}, ${err}`);  // Optional: log error trace

    if (err < minError) {
      minError = err;
      bestA = a;
    }
  }

  return bestA;
}

function interpolateArrays(x, y, numPoints) {
  if (x.length !== y.length) {
    throw new Error("x and y must have the same length");
  }

  // Sort x and y together
  const { x: sortedX, y: sortedY } = sortXY(x, y);

  const minX = sortedX[0];
  const maxX = sortedX[sortedX.length - 1];

  // Create evenly spaced points between minX and maxX
  const xNew = [];
  const step = (maxX - minX) / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    xNew.push(minX + i * step);
  }

  // Interpolate y values for xNew
  const yNew = interpolate(sortedX, sortedY, xNew);

  return { x: xNew, y: yNew };
}



document.getElementById('resetShifts').addEventListener('click', function() {

    for(var i =0; i < inputer_TTS.length; i ++ ){
      inputer_TTS[i].inputs['b'].elem.value = 1;
      inputer_TTS[i].inputs['b'].elem_base.value = 1;
      inputer_TTS[i].inputs['b'].elem.dispatchEvent(new Event('change'));
      inputer_TTS[i].inputs['a'].elem.value = 1;
      inputer_TTS[i].inputs['a'].elem_base.value = 1;
      inputer_TTS[i].inputs['a'].elem.dispatchEvent(new Event('change'));
    }

});

document.getElementById('autoshiftAts').addEventListener('click', function() {
  console.log("autoshiftAts");
  let Gps = [];
  let Gpps = [];
  let omegas = [];

  let max_trace_length = 0;
  let j = 0;
  for(let i = 0; i < traces.length; i += 2){
    omegas.push(traces[i].base_x)
    Gps.push(traces[i].base_y)
    Gpps.push(traces[i+1].base_y.map(val => val * inputer_TTS[j].inputs['b'].elem_base.value));
    j = j + 1; 
  }
  console.log(omegas);

  let prevA = 1; 
 for (let i = 1; i < Gps.length; i++) {
    let normOmega1 = log10Array(omegas[i - 1]);
    let normGp1 = log10Array(Gps[i - 1]);
    let normGpp1 = log10Array(Gpps[i - 1]);
    ({ x: normOmega1, y: normGpp1 } = interpolateArrays(normOmega1, normGpp1, 100));

    let normOmega2 = log10Array(omegas[i]);
    let normGp2 = log10Array(Gps[i]);
    let normGpp2 = log10Array(Gpps[i]);
    ({ x: normOmega2, y: normGpp2 } = interpolateArrays(normOmega2, normGpp2, 100));
    var bestA = findBestScalingFactorLog(
      normOmega1, normGpp1,
      normOmega2, normGpp2,
      0.01, 1, 1000
    );
    bestA = 1/(Math.pow(10, bestA));
    bestA = bestA * prevA
    console.log("best A : " + bestA)
    prevA = bestA;
    inputer_TTS[i].inputs['a'].elem.value = 1;
    inputer_TTS[i].inputs['a'].elem_base.value = bestA;
    inputer_TTS[i].inputs['a'].elem.dispatchEvent(new Event('change'));
    update_TTS();
  }
});

document.getElementById('autoshiftBts').addEventListener('click', function() {
  console.log("autoshiftBts");
  let Gps = [];
  let omegas = [];

  let max_trace_length = 0;
  let j = 0; 
  for(let i = 0; i < traces.length; i += 2){
    omegas.push(traces[i].base_x.map(val => val* inputer_TTS[j].inputs['a'].elem_base.value));
    Gps.push(traces[i].base_y)
    j = j + 1; 
  }
  console.log(omegas);

  let prevB = 1; 
 for (let i = 1; i < Gps.length; i++) {
    let normOmega1 = log10Array(omegas[i - 1]);
    let normGp1 = log10Array(Gps[i - 1]);
    ({ x: normOmega1, y: normGp1 } = interpolateArrays(normOmega1, normGp1, 100));

    let normOmega2 = log10Array(omegas[i]);
    let normGp2 = log10Array(Gps[i]);
    ({ x: normOmega2, y: normGp2 } = interpolateArrays(normOmega2, normGp2, 100));
    var bestB = findBestScalingFactorLogB(
      normOmega1, normGp1,
      normOmega2, normGp2,
      0.001, 1, 1000
    );
    // console.log("best B : " + bestB)
    bestB = 1/(Math.pow(10, bestB));
    bestB = bestB * prevB
    console.log("best B : " + bestB)
    prevB = bestB;
    inputer_TTS[i].inputs['b'].elem_base.value = bestB;
    inputer_TTS[i].inputs['b'].elem.value = 1;
    inputer_TTS[i].inputs['b'].elem.dispatchEvent(new Event('change'));
  }
    update_TTS();
});





var filename = "output";
var traces = []
var inputer_traces = [];
var inputer_TTS = []







var transpose = function (a) {
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;
  if(h === 0 || w === 0) { return []; }
  var i, j, t = [];
  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = a[j][i];
    }
  }
  return t;
}

var removeOptions = function (selectElement) {
   var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}


function make_trace_boxes(){
  inputer_traces = [];
  inputer_TTS = [];
  for(var j = 0; j< 50; j +=1){
    if( document.getElementById('app'+j.toString()) != null ){
      document.getElementById('app'+j.toString()).remove();
    }
    if( document.getElementById('appTTS'+j.toString()) != null ){
      document.getElementById('appTTS'+j.toString()).remove();
    }
  }

  for(var j = 0; j< traces.length; j +=1){

    var div = document.createElement('div');  //creating element
    div.id = "app" + j.toString();         //adding text on the element
    document.getElementById("data").appendChild(div);           //appending the element

    var palette = document.getElementById("palettes").options[document.getElementById("palettes").selectedIndex].innerText;
    if(palette.endsWith("_")){
      palette = document.getElementById("n_colors").value.concat("_").concat(palette);
      palette = palette.slice(0, -1);
      console.log(palette)
    }

      inputer_traces.push(new inputer(div.id, {
        name: {it: "text", def: ""},
        visible: {it: "option", options: ['true' , 'false' , "legendonly" ]},
        line:  { 
          width: {it: "number", def: 1},
          shape: {it: "option", options: ["spline", "linear", "hv", "vh", "hvh", "vhv"]},
          dash: {it: "option", options: ["solid", "dot", "dash", "longdash", "dashdot", "longdashdot"]},
          smoothing: {it: "number", def: 0,},
          color: {it: "option", options: colors_palettes[palette]},
        },
        mode: {it: "option", options: ['lines',"markers", 'text', 'none', 'lines+markers','lines+markers+text' ]},
        marker: { 
          size: {it: "number", def: 6},
          symbol: {it: "option", options: marker_shapes},
          color: {it: "option", options: colors_palettes[palette],},
        },
        type: {it: "option", options: ["scatter", 'bar'],},
        },
        function(){
          update();
        }
      ));

      if( j%2 == 0){

        var div = document.createElement('div');  //creating element
        div.id = "appTTS" + j.toString();         //adding text on the element
        document.getElementById("TTS").appendChild(div);           //appending the element

        inputer_TTS.push(new inputer(div.id, {
          "Temperature [C]": {it: "number", def: 0,},
          a: {it: "slider", def: 1, base: 1, step: 0.00005, min: 0.000001, max:1 },
          b: {it: "slider", def: 1, base: 1, step: 0.00005, min: 0.000001, max:1},
        },
        function(){
          update_TTS();
        })) 
      }
  }
} 



function plot(header, data, update_nums=false){
  global_header = header
  var index_header = 0;
  var datas = []
  var xs = [0]
  var i = 2;
  var ys = [1]
  var reset = false;
  for(var j = 2; j< header.length; j +=1){
    if( reset && (header[j] != "" )){
      xs.push(j);
      reset = false
      i+=1
    }else if( header[j] != "" ){
      ys.push(j);
      i += 1;
    } else if (header[j] == "" ){
      reset = true
    }
  }

  var index_undefined = 0;
  for(var j = 0; j< data.length; j +=1){
    index_undefined = data[j].length;
    if( data[j][data[j].length-1] == undefined || isNaN(data[j][data[j].length-1]) || data[j][data[j].length-1] ==''){
      for(var i =0 ; i < data[j].length; i ++){
        data[j][i] = parseFloat(data[j][i])
        if(data[j][i] == undefined || isNaN(data[j][i]) || ( data[j][i] != 0 && data[j][i] == '') ){
          index_undefined = i
          break;
        }
      }
    }
    data[j] = data[j].slice(0, index_undefined)
  }

  var headers = []
  i = 0;
  j = 0;
  var q = 0;
  while( i < xs.length-1 && q < 100){
    while(j < ys.length && q < 100 && xs[i+1]>ys[j]){
      datas.push([data[xs[i]], data[ys[j]]]);
      headers.push(header[ys[j]]);
      j += 1
    }
    q += 1
    i += 1
  }
  while(j < ys.length && q < 100){
    datas.push([data[xs[xs.length-1]], data[ys[j]]]);
    headers.push(header[ys[j]]);
    j += 1
    q+=1;
  }

  var base_index = 0
  if(!update_nums){
    traces = []
  }else{
    traces = traces.slice(0, datas.length);
  }

  var palette = document.getElementById("palettes").options[document.getElementById("palettes").selectedIndex].innerText;
  if(palette.endsWith("_")){
    palette = document.getElementById("n_colors").value.concat("_").concat(palette);
    palette = palette.slice(0, -1);
    console.log(palette)
  }


  for(var j = 0; j< datas.length; j +=1){
    if( j < traces.length){
      traces[j].x = datas[j][0]
      traces[j].y = datas[j][1]
      traces[j].name = headers[j]

    }else{

    var marker_shape = marker_shapes[j%marker_shapes.length];
    var line_shape = line_shapes[0];

    
  
    var color = colors_palettes[palette][j%colors_palettes[palette].length];
    


    var trace = {
        x: datas[j][0],
        y: datas[j][1],
        visible: true,
        name: headers[j],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            size: 6,
            symbol: marker_shape,
            color: color,
          },

      line: {
        shape: "spline",
        dash: line_shape,
        width: 1,
            color: color,
      },
    }
    traces.push(trace)
    }
  }

  make_trace_boxes();

  for(var i = 0; i < traces.length; i ++ ){
    inputer_traces[i].update_data(traces[i]);
    traces[i].base_x = traces[i]['x']
    traces[i].base_y = traces[i]['y']
  }
  
  document.getElementById("n_colors").value = traces.length

  if(!update_nums){
    var layout = inputer_layout.get_data();
    // layout.xaxis.title.text = header[0];
    // layout.yaxis.title.text = header[1];
    if(traces.length >1){
      layout.showlegend = true;
    }else{
      layout.showlegend = false;
    }
    inputer_layout.update_data(layout);
  }


  Plotly.newPlot(document.getElementById('gd'), traces, inputer_layout.get_data(), {
      modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'select2d', 'lasso2d'],
      modeBarButtonsToAdd: [{
        name: 'to SVG',
        icon: Plotly.Icons.camera,
        click: function(gd) {
          // Plotly.downloadImage(gd, {format: 'svg'})
          save_plot("svg")
        }},{
        name: 'to png',
        icon: Plotly.Icons.camera,
        click: function(gd) {
          save_plot("png");
          // Plotly.downloadImage(gd, {format: 'png', scale:8})
        }
      }]
  },);
  
  // helper_reset_colors();
  // helper_pair_colors();
  // helper_pair_markers();
  // helper_pair_linestyles();
  update_TTS();
};



var inputer_layout = new inputer("app", OPT_inputer_layout , function(e){
  update();
});




function input_csv(selectedFile) {
  Papa.parse(selectedFile, {
    dynamicTyping: false,
    complete: function(results) {
      header = results.data[0]
      datapoints = []

      for(var i = 1; i < results.data.length; i ++){
        row = []
        for(var j = 0; j< header.length; j +=1){
          x = parseFloat(results.data[i][j])
          row.push(x)
        }
        datapoints.push(row)
      }
      datapoints = transpose(datapoints)
      var update_date = false;
      if( traces.length > 0){
        update_date = true;
      }
      plot(header, datapoints, update_date)
      update();
      load_default_template()
    }
  })
};



function save_plot(type){
  console.log(filename)
  if( type == "png"){
    Plotly.downloadImage(gd, {format: 'png', scale:8, filename})
    return;
  }
  if( type == "svg"){
    // const config={type:'save-file'}
    // dialog(config)
    //     .then(file => {
    //      console.log(file[0])
          Plotly.downloadImage(gd, {
              // filename: file[0],
              format: 'svg',
            }).then(result => {
          console.log(result);
          console.log("Should save a template as well..");
        });
        // })
        // .catch(err => console.log(err))

    return
  }
}

function selectOption(elem, index, trigger=false){
  if (index == 0) { 
    elem.options.selectedIndex = index;
  }
  else {
    elem.options.selectedIndex = (index );
  }
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    if(trigger){
      elem.dispatchEvent(evt);
    }
  }
  else if(trigger) {
    elem.fireEvent("onchange");
  }
}

function import_json(json_text, update_data=true, update_trace_styles=true, update_trace_names = false, update_axes_labels=false){


  var prevLayout = inputer_layout.get_data();
  var json = JSON.parse(json_text)
  var l = json["layout"]


    var elem = document.getElementById("palettes");
    var colors =[...elem.options].map(o => o.value)
    pal = json["palette"]
    if( pal.endsWith("_")){
      document.getElementById("n_colors").value = parseInt(pal.slice(0,1))
      pal = pal.slice(2)
      console.log(pal);
    }
    selectOption(elem, colors.indexOf(pal));
    pal = json["palette"]
    if( pal.endsWith("_")){
      pal = pal.slice(0, -1)
      console.log(pal);
    }

    
  var prev_data = []
  for(var i = 0 ; i < traces.length; i ++ ){
    var trace_data = {
      "x": traces[i]['x'],
      "y": traces[i]['y'],
      'name': traces[i]['name']
    }
    prev_data.push(trace_data); 
  }

  for(var i = 0; i < traces.length; i ++ ){
    inputer_traces[i].update_data(traces[i]);
    traces[i].base_x = traces[i]['x']
    traces[i].base_y = traces[i]['y']
  }
  
  var new_traces = json["traces"];
  for(var i = 0 ; i < new_traces.length &&  i < new_traces.length; i ++ ){
    new_traces[i]['name'] = decodeURIComponent(new_traces[i]['name'])
  }
  if(!update_data){
    for(var i = 0 ; i < prev_data.length && i < new_traces.length &&  i < traces.length; i ++ ){
      new_traces[i]['x'] = prev_data[i]['x']
      new_traces[i]['y'] = prev_data[i]['y']
      if( !update_trace_names ){   
        new_traces[i]['name'] = traces[i]['name']
      } 
    }
  }
  l.xaxis.title.text  = decodeURIComponent(l.xaxis.title.text);
  l.yaxis.title.text  = decodeURIComponent(l.yaxis.title.text);
  if(prev_data.length > 0 ){
    if( !update_axes_labels ){
      l.xaxis.title.text  = prevLayout.xaxis.title.text
      l.yaxis.title.text  = prevLayout.yaxis.title.text
    }
  }
  inputer_layout.update_data(l);

  if(update_data){
    traces = structuredClone(new_traces);
  }

  if( update_trace_styles || inputer_traces.length == 0 ){
    make_trace_boxes();
    for(var i = 0 ; i < inputer_traces.length && i < traces.length && i < new_traces.length; i ++){
      inputer_traces[i].update_data(new_traces[i]);
      inputer_traces[i].fill_json(traces[i]);
    }
    for(var i = new_traces.length; i < traces.length; i ++ ){
      inputer_traces[i].update_data(traces[i]);
      inputer_traces[i].fill_json(traces[i]); 
    }


    for(var i = 0 ; i < inputer_traces.length && i < new_traces.length; i ++) {
      var index = colors_palettes[pal].indexOf(new_traces[i].line.color);
      selectOption(inputer_traces[i].inputs.line.color.elem, index);
      index = colors_palettes[pal].indexOf(new_traces[i].marker.color);
      selectOption(inputer_traces[i].inputs.marker.color.elem, index);
    }
    for(var i = new_traces.length; i < inputer_traces.length; i ++ ){
      selectOption(inputer_traces[i].inputs.marker.color.elem,i%colors_palettes[pal].length);
      selectOption(inputer_traces[i].inputs.line.color.elem,i%colors_palettes[pal].length);
    }
    
  }

  Plotly.newPlot(document.getElementById('gd'), traces, inputer_layout.get_data(), {
    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'select2d', 'lasso2d'],
    modeBarButtonsToAdd: [
    {
      name: 'to SVG',
      icon: Plotly.Icons.camera,
      click: function(gd) {
        save_plot("svg");
      }
    },{
      name: 'to png',
      icon: Plotly.Icons.camera,
      click: function(gd) {
        save_plot("png");
      }
    }] // END modeBarButtonsToAdd
    },); // END Plotly.newPlot

    update();


    // Update the colors in the color options dropdowns by triggering palette changed 
    var event = new Event('change');
    document.getElementById("palettes").dispatchEvent(event);
  
}

function multiply(arr, x) {
  new_arr = []
  for (var i = 0; i < arr.length; i++) {
      new_arr.push(arr[i]*x)
  }
  return new_arr
}

function update(){


    
    // Assuming you have a Plotly plot named 'myPlot'
  var plot = document.getElementById('gd');

    // Get the x-axis and y-axis ranges
  var xaxisRange = plot.layout.xaxis.range;
  var yaxisRange = plot.layout.yaxis.range;

  document.getElementById("gd_div").style.width = inputer_layout.get_data()['width'];
  for(var i = 0 ; i < traces.length; i ++){

    traces[i] = inputer_traces[i].fill_json(traces[i]);
    
    if(i % 2 == 0){
          traces[i].marker.symbol = "square";
      }else{
          traces[i].marker.symbol = "square-open";
      }

    len =  Math.floor(traces.length / 2);
    name = len.toString() + "_magma_r"
    traces[i].marker.color = colors_palettes[name][Math.floor(i/2)]

    traces[i].line.color = colors_palettes[name][Math.floor(i/2)]

    inputer_traces[i].update_data(traces[i]);

    // console.log(traces[i]['a'])
  }


  // for(var i = 0 ; i < traces.length; i ++){
  //   traces[i] = inputer_traces[i].fill_json(traces[i]);
  //   inputer_traces[i].update_data(traces[i]);
  //   console.log(traces[i]['a'])
  // }

  var l = inputer_layout.get_data();
  l.xaxis.range = xaxisRange
  l.yaxis.range = yaxisRange


  Plotly.relayout(document.getElementById('gd'), l);


  Plotly.update(document.getElementById('gd'), l)

}

function update_TTS() {

  for (var i = 0; i < inputer_TTS.length; i++) {
    a = parseFloat(inputer_TTS[i].inputs['a'].elem.value)*parseFloat(inputer_TTS[i].inputs['a'].elem_base.value);
    b = parseFloat(inputer_TTS[i].inputs['b'].elem.value)*parseFloat(inputer_TTS[i].inputs['b'].elem_base.value);

    if (a > 0) {
      // console.log("i:", i);
      // console.log("traces[i*2]:", traces[i * 2]);

      if (traces[i * 2] && traces[i * 2].hasOwnProperty('base_x')) {
        // console.log("traces[i*2].base_x:", traces[i * 2].base_x);
        traces[i * 2]['x'] = multiply(traces[i * 2].base_x, a);
        traces[i * 2 + 1]['x'] = multiply(traces[i * 2 + 1].base_x, a);
      } else {
        // console.log("traces[i*2] is undefined or does not have 'base_x'");
      }
    }
    if (b > 0) {
      if (traces[i * 2] && traces[i * 2].hasOwnProperty('base_y')) {
        traces[i * 2]['y'] = multiply(traces[i * 2].base_y, b);
        traces[i * 2 + 1]['y'] = multiply(traces[i * 2 + 1].base_y, b);
      } else {
        // console.log("traces[i*2] is undefined or does not have 'base_y'");
      }
    }
  }
  update();
}


function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}



document.getElementById('download').addEventListener( 'click', function(){

    var output_file = filename;
    console.log(output_file);
    const element = document.createElement('a');
    var json_text = get_template_text();

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json_text));
    element.setAttribute('download', output_file.concat(".json"));
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

});




document.getElementById("palettes").addEventListener("change", function (){
  console.log("Color Palette selected ")
  var index = document.getElementById("palettes").selectedIndex
  var color = document.getElementById("palettes").options[index].innerText
  if(color.endsWith("_")){
    var n_colors = document.getElementById("n_colors").value
    console.log("n_colors ", n_colors);
    if(n_colors>12){
      n_colors = 12;
    }
    else if(n_colors<2){
      n_colors = 2;
    }
    color = n_colors.toString().concat("_").concat(color.slice(0, color.length-1));
  }
  if( colors_palettes[color] == undefined ){
    return;
  }

  function set_color_options(inputer){ //todo
    var index_marker_color = inputer.inputs.marker.color.elem.selectedIndex;
    var index_line_color = inputer.inputs.line.color.elem.selectedIndex;
    inputer.inputs.marker.color.options=colors_palettes[color]
    inputer.inputs.line.color.options=colors_palettes[color]
    function replace_options(dropdown, new_index){
      removeOptions(dropdown);
      for(var j=0;j<colors_palettes[color].length;j++){
        var opt = document.createElement("option");
        opt.text = colors_palettes[color][j];
        opt.value = colors_palettes[color][j];
        opt.style.background = colors_palettes[color][j];
        dropdown.style.marginLeft = '15px'
        dropdown.options.add(opt);
      }
      selectOption(dropdown, new_index);
      dropdown.style.background = dropdown.options[dropdown.selectedIndex].text;  
    }
    replace_options(inputer.inputs.line.color.elem, index_line_color%colors_palettes[color].length)
    replace_options(inputer.inputs.marker.color.elem, index_marker_color%colors_palettes[color].length)
  }
      
  for(var i = 0 ; i < traces.length; i ++) {
    set_color_options(inputer_traces[i]);
  }

  update();
});


function resetFileInput() {
    var fileInput = document.getElementById('input_file');
    fileInput.type = 'text';  // Change the type temporarily to allow cloning
    var newFileInput = fileInput.cloneNode(true);
    newFileInput.type = 'file';  // Change the type temporarily to allow cloning
    fileInput.parentNode.replaceChild(newFileInput, fileInput);
  newFileInput.addEventListener('change', input_file_event);
}


function  input_file_event(){
  if (!this.files && !this.files[0]) {
    return;
  }
  console.log("Inputting file")
  console.log(this.files[0]);
  filename = this.files[0].name
  load_file(this.files[0])
  resetFileInput();
}
var input = document.getElementById('input_file')
input.addEventListener("change", input_file_event);


function load_file(file){
  var name = file.name;

   console.log("Load file") 
   // get_file();

  if( name.endsWith(".csv") ){

    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      var csvdata = event.target.result.toString();
      data = csvdata.split('\n') // split string to lines
          .map(e => e.trim()) // remove white spaces for each line
          .map(e => e.split(',').map(e => e.trim())); // split each line to array;
          console.log(data);

        console.log("Data:")                            
      var header = data[0];
      var data = data.slice(1, data.length);
      plot(header, transpose(data), data[0]);
      

      // load_default_template()
          // event.sender.send('load_file-task-finished', [false, data]); 
        // helper_pair_linestyles();
        // helper_pair_markers();
    }

  
  }else if( name.endsWith(".xlsx") ){

    var reader = new FileReader();
    
    reader.onload = function(e) {
        var data = e.target.result;
        var header = []
      const wb = XLSX.read(data, {type: 'binary'});
      const sheet = wb.Sheets[wb.SheetNames[0]]
      console.log(sheet);
      function getColumnName(index) {
          let columnName = '';
          while (index >= 0) {
              columnName = String.fromCharCode((index % 26) + 65) + columnName;
              index = Math.floor(index / 26) - 1;
          }
          return columnName;
      }

      // Assuming `sheet` is already defined and contains the Excel sheet data
      var header = [];

      for (var n = 0; n < 100; n++) {
          var cell = getColumnName(n).concat("1");
          if (sheet[cell] === undefined) {
              header.push('');
          } else {
              header.push(sheet[cell].v);
          }
      }

      console.log(header);

      console.log(header) 

    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Get maximum number of columns
      const maxColumns = Math.max(...jsonData.map((row) => row.length));

      // Convert all cells to a list of arrays
      const cells = [];
      for (let i = 0; i < maxColumns; i++) {
        const columnData = jsonData.map((row) => row[i]);
        columnData.shift(); // Remove the first item from each column
        cells.push(columnData);
      }

    console.log(cells);
    plot(header, cells);
    // load_default_template()
  }
    reader.readAsBinaryString(file);

  }

    if(name.endsWith(".json")){
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        import_json(e.target.result, true, true, true, true)
      });reader.readAsBinaryString(file);
  }

update_TTS();

}





function load_templ(index, with_data=false){
  var update_trace_styles = document.getElementById("update_trace_styles_check").checked;
  import_json(templates_list[index][1], with_data, update_trace_styles, false, false);

}


function change_template(){
  console.log("Choosing template");
  var index = document.getElementById('template_dropdown').selectedIndex
  var template_name = document.getElementById('template_dropdown').options[index].innerText;
  console.log(template_name);

  for (let i = 0; i < templates_list.length; i++) {
    const tuple = templates_list[i];
    if (tuple[0] === template_name) {
      load_templ(i);
    }
  } 
}

var dropdown = document.createElement("select");
dropdown.id = 'template_dropdown';
var opt = document.createElement("option");

// Get the localStorage Templates 
// Get the total number of items in localStorage
var itemCount = localStorage.length;

// Iterate through each item
for (var i = 0; i < itemCount; i++) {
  // Get the key at the current index
  var key = localStorage.key(i);

  // Check if the key starts with "template_"
  if (key.startsWith("LocalStorage_")) {
    // Retrieve the value associated with the key
    var value = localStorage.getItem(key);

    templates_list.push([key.split("_")[1], value])

    // Perform your desired operations with the key and value
    console.log("Key: " + key + ", Value: " + value);
  }
}


for (let i = 0; i < templates_list.length; i++) {
  var opt = document.createElement("option");
  opt.text = templates_list[i][0];
  dropdown.options.add(opt);
}
dropdown.onchange =  change_template;
document.getElementById("template_div").appendChild(dropdown);


function load_default_template(update_data=false){
  for (var i = 0; i < dropdown.options.length; i++) {
    var option = dropdown.options[i];
    var optionValue = option.value;
    var optionText = option.text;
    console.log("Option " + i + ": Value=" + optionValue + ", Text=" + optionText);
    if( optionText == "TTS"){
      load_templ(i, update_data);
      console.log("Loading default")
      dropdown.selectedIndex = i


      return;
    }  
  }
  load_templ(0);
  
}

load_default_template(true)

</script>

# References 
[^WLF]: M. L. Williams, R. F. Landel, and J. D. Ferry, J. Am. Chem. Soc., 77 (1955), 3701.