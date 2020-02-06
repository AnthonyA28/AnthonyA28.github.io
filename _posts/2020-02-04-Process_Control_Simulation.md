---
title: Process Control Simulation
layout: article_post
section: article
excerpt: Simulating a process control system of a AR(1) process using a PI controller. 
---


# Process Control Simulation

Below is a simulation of a AR(1) process with PI control applied to it. 


<canvas id="chart" class="chartjs" width="300" height="150"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<form action="#" onsubmit="update_params();return false">
    Phi: <input type="text" id="phi_id" value =0.95><br>
    standard deviation: <input type="text" id="standard_deviation_id" value ="1.0"><br>
    Sample period (ms) : <input type="text" id="samplePeriod_id" value = "500"><br>
    Kc : <input type="text" id="Kc_id" value = "1.0"><br>
    tauI : <input type="text" id="tauI_id" value= "100"><br>
    tauD : <input type="text" id="tauD_id" value = "1.0"><br>
    setpoint : <input type="text" id="setpoint_id" value = "10"><br>

    <input type="submit">
</form>

<script>
'use strict';
var phi = 0.95;
var standard_deviation = 1; 
var dt = 500; 

var y_prev = 0;
var error = 0 ;
var errorPrev = error;
var u = 0;
var u_prev = 0;
var start_time; 
var y_setpoint = 10;
var Kc = 1;
var tauI = 100;
var tauD = 1; 
var G = .1;
var sumForIntegral = 0


// returns a gaussian random function with the given mean and stdev.
function gaussian(mean, stdev) {
    // variance of uniform distribution = 1/12 (b-a)^2 *wikipedia
    // dif =  (b-a) 
    let dif = stdev*12.0;
    let max = mean + dif/2.0;
    let min = mean - dif/2.0;
    let n = 100;
    let i = 0
    let sum = 0;
    for (i = 0; i < n; i ++) {
      sum += (Math.random() * (max - min) ) + min;
    }
    return sum/n;
}

function update_params() {
    let input = document.getElementById("phi_id").value;
    let x = 0; 
    if( input != "") {
      x = parseFloat(input); 
      if (isNaN(x)){
        window.alert("Phi must be a valid number.");
        document.getElementById("phi_id").value = "";
        return; 
      } 
      else {
        phi = x;
      }
    }

    input = document.getElementById("samplePeriod_id").value;
    if ( input != "" ) {
      x = parseFloat(input);
      if (isNaN(x)){
        window.alert("Sample period must be a valid number.");
        document.getElementById("samplePeriod_id").value = "";
        return;
      } 
      else {
        dt = x;
      }
    }
    input = document.getElementById("standard_deviation_id").value; 
    if( input != "") {
      x = parseFloat(input); 
      if (isNaN(x)){
        window.alert("standard_deviation must be a valid number.");
        document.getElementById("standard_deviation_id").value = "";
        return; 
      } 
      else {
        standard_deviation = x;
      }
    }
    input = document.getElementById("tauD_id").value; 
    if( input != "") {
      x = parseFloat(input); 
      if (isNaN(x)){
        window.alert("tauD must be a valid number.");
        document.getElementById("tauD_id").value = "";
        return; 
      } 
      else {
        tauD = x;
      }
    }
    input = document.getElementById("setpoint_id").value; 
    if( input != "") {
      x = parseFloat(input); 
      if (isNaN(x)){
        window.alert("setpoint must be a valid number.");
        document.getElementById("setpoint_id").value = "";
        return; 
      } 
      else {
        y_setpoint = x;
      }
    }
    input = document.getElementById("tauI_id").value; 
    if( input != "") {
      x = parseFloat(input); 
      if (isNaN(x)){
        window.alert("tauI must be a valid number.");
        document.getElementById("tauI_id").value = "";
        return; 
      } 
      else {
        tauI = x;
      }
    }
}

var start_time = new Date().getTime();

var chart = new Chart(document.getElementById("chart"),
    {"type":"line",
        "data":{
        "labels":[],
        "datasets":[{"label":"y",
        "data":[],
        "fill":false,
        "borderColor":"rgb(75, 192, 192)",
        "lineTension":0.1}]},
        "options":{}
    }
);


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}


function time_series_fn(last_y){
    var next_y = phi*last_y + gaussian(0,standard_deviation);;// 
    return next_y;
}

function timed_callback() {
  var current_time = new Date();
  let s = Math.floor((current_time - start_time)/1000.0);
  let length = chart.data.datasets[0].data.length;

  if( length>0 ){
    var y_nminus1 = chart.data.datasets[0].data[length-1]
  } else {
    var y_nminus1 = 0; 
    addData(chart, s, y_nminus1);
  }

  let y = time_series_fn(y_nminus1);
  errorPrev = error;
  error = y_setpoint - y ;
  console.log("y: " + y);
  let KI = Kc/tauI; 
  sumForIntegral += KI*error;
  let propInt = 1 + Kc * error + dt * sumForIntegral;
  let u = propInt;
  // if( u > 10 ) u = 100; 
  // if( u < -10 ) u = -100;
  y = y + G*u;

  console.log("error: " + error);
  console.log("setpoint: " + y_setpoint)
  console.log("u: " + u);
  

  addData(chart, s, y);
  if(chart.data.labels.length > 50) { removeData(chart)};
  setTimeout(timed_callback, dt);
}



setTimeout(timed_callback, dt);

</script>
