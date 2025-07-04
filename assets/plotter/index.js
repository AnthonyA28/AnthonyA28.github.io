document.addEventListener('keydown', function (event) {
    const activeElement = document.activeElement;

    function convertLatexToHtml(latex) {
        const superscriptRegex = /\^(\{.*?\}|.)/;
        const subscriptRegex = /_(\{.*?\}|.)/;
        const fracRegex = /\\frac\{(.*?)\}\{(.*?)\}/;

        while (superscriptRegex.test(latex) || subscriptRegex.test(latex) || fracRegex.test(latex)) {
            // Replace superscripts
            latex = latex.replace(superscriptRegex, (match, p1) => {
                const content = p1.startsWith("{") ? p1.slice(1, -1) : p1;
                return `<sup>${content}</sup>`;
            });

            // Replace subscripts
            latex = latex.replace(subscriptRegex, (match, p1) => {
                const content = p1.startsWith("{") ? p1.slice(1, -1) : p1;
                return `<sub>${content}</sub>`;
            });

            // Replace fractions
            latex = latex.replace(fracRegex, (match, numerator, denominator) => {
                return `<sup>${numerator}</sup>⁄<sub>${denominator}</sub>`;
            });
        }
        return latex;
    }

    function convertHtmlToLatex(html) {
        const supRegex = /<sup>(.*?)<\/sup>/g;
        const subRegex = /<sub>(.*?)<\/sub>/g;
        const fracRegex = /<sup>(.*?)<\/sup>⁄<sub>(.*?)<\/sub>/g;

        while (supRegex.test(html) || subRegex.test(html) || fracRegex.test(html)) {
            // Replace fractions
            html = html.replace(fracRegex, (match, numerator, denominator) => `\\frac{${numerator}}{${denominator}}`);

            // Replace superscripts
            html = html.replace(supRegex, (match, p1) => `^${p1.length > 1 ? `{${p1}}` : p1}`);

            // Replace subscripts
            html = html.replace(subRegex, (match, p1) => `_${p1.length > 1 ? `{${p1}}` : p1}`);
        }
        return html;
    }

    const greekMap = {
        "\\alpha": "α", "\\beta": "β", "\\gamma": "γ", "\\delta": "δ", "\\epsilon": "ε",
        "\\eta": "η", "\\theta": "θ", "\\iota": "ι", "\\kappa": "κ", "\\zeta": "ζ",
        "\\mu": "μ", "\\nu": "ν", "\\xi": "ξ", "\\omicron": "ο", "\\pi": "π",
        "\\rho": "ρ", "\\lambda": "λ", "\\tau": "τ", "\\upsilon": "υ", "\\sigma": "σ",
        "\\chi": "χ", "\\psi": "ψ", "\\omega": "ω", "\\phi": "φ", "\\cdot": "⋅",
        "\\Alpha": "Α", "\\Beta": "Β", "\\Gamma": "Γ", "\\Delta": "Δ", "\\Epsilon": "ϵ",
        "\\Eta": "Η", "\\Theta": "ϴ", "\\Iota": "Ι", "\\Kappa": "Κ", "\\Zeta": "Ζ",
        "\\Mu": "Μ", "\\Nu": "Ν", "\\Xi": "Ξ", "\\Omicron": "Ο", "\\Pi": "Π",
        "\\Rho": "Ρ", "\\Lambda": "Λ", "\\Tau": "Τ", "\\Upsilon": "Υ", "\\Sigma": "Σ",
        "\\Chi": "Χ", "\\Psi": "Ψ", "\\Omega": "Ω", "\\Phi": "Φ", "\\cdot": "⋅","<": "<sub></sub>", ">": "<sup></sup>"
    };


    // Handle input and textarea fields
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {

        if (event.ctrlKey && event.shiftKey && event.key === 'R') {
            event.preventDefault();

            let value = activeElement.value;
            if (value.startsWith('$\\mathrm{')) value = value.slice(9);
            if (value.endsWith('}$')) value = value.slice(0, -2);

            Object.keys(greekMap).slice(0, -2).forEach(key => {
                const regex = new RegExp(key.replace(/\\/g, '\\\\'), 'g'); // Escape the backslash for regex
                value = value.replace(regex, greekMap[key]);
            });

            activeElement.value = convertLatexToHtml(value);
            update();
        }
        if (event.ctrlKey && event.shiftKey && event.key === 'E') {
            event.preventDefault();

            const reversedMap = Object.entries(greekMap)
                .slice(0, -2)
                .reduce((acc, [key, value]) => {
                    acc[value] = key;
                    return acc;
                }, {});

            let value = activeElement.value;

            Object.keys(reversedMap).forEach(char => {
                const regex = new RegExp(char, 'g');
                value = value.replace(regex, reversedMap[char]);
            });

            if (value.startsWith('$\\mathrm{'))value = value.slice(9);
            if (value.endsWith('}$')) value = value.slice(0, -2);
            activeElement.value = convertHtmlToLatex(`$\\mathrm\{${value}\}$`);
            update();
        }

    }
});










var filename = "output";
var traces = []
var inputer_traces = [];



var templates_list = [
    ["default",           '{"layout":{"showlegend":false,"legend":{"bordercolor":"#444","bgcolor":"#FFFFFF","xanchor":"left","yanchor":"middle","x":1.1,"y":0.5,"margin":{"autoexpand":true,"b":50,"l":50,"r":100,"t":50},"itemwidth":10},"xaxis":{"title":{"text":"x","font":{"color":"#000000","size":18},"standoff":0},"range":[],"type":"linear","mirror":"ticks","zeroline":false,"dtick":"","ticks":"inside","exponentformat":"power","ticklen":"5","tickcolor":"#000000","linecolor":"#000000","tickprefix":"","ticksuffix":"","showgrid":false,"tickfont":{"color":"#000000"},"minor":{"dtick":"","showgrid":false,"ticks":"inside","ticklen":2,"tickcolor":"#000000","linecolor":"#000000"}},"yaxis":{"title":{"text":"y","font":{"color":"#000000","size":18},"standoff":0},"range":[],"type":"linear","mirror":"ticks","zeroline":false,"dtick":"","ticks":"inside","exponentformat":"power","ticklen":5,"tickcolor":"#000000","linecolor":"#000000","tickprefix":"","ticksuffix":"","showgrid":false,"tickfont":{"color":"#000000"},"minor":{"showgrid":false,"dtick":"","ticks":"inside","ticklen":2,"tickcolor":"#000000","linecolor":"#000000"}},"yaxis2":{"title":{"text":"headerY","font":{"color":"#000000","size":18},"standoff":25},"overlaying":"y","side":"right","range":[],"type":"linear","mirror":false,"zeroline":false,"dtick":"","ticks":"inside","exponentformat":"power","ticklen":5,"tickcolor":"#000000","linecolor":"#000000","tickprefix":"","ticksuffix":"","showgrid":false,"tickfont":{"color":"#000000"},"minor":{"dtick":"","ticks":"inside","ticklen":2,"tickcolor":"#000000","linecolor":"#000000"}},"margin":{"b":80,"l":80,"r":230,"t":30},"font":{"family":"Segoe UI","size":14,"color":"#000000"},"width":530,"height":330,"paper_bgcolor":"#FFFFFF","plot_bgcolor":"#FFFFFF","use_error_bars":false},"traces":[{"x":[17.6990458957621,2.13728221778784,0.346123572451268,0.0784999999999998,0.0289395350672483,0.0130537744783035],"y":[3.66845263240629,2.31017363209877,1.44586524235294,0.723120573844419,0.184471042767296,0.143787253402463],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"circle","color":"#0000ff"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#0000ff"},"error_y":{"type":"data","array":[0.222860196532869,0.701965232973014,0.0474525010499611,0.0236835454455727,0.0333387769715564,0.0135931219149001],"visible":true,"thickness":2,"width":4,"color":"#0000ff"}},{"x":[17.6990458957621,2.13728221778784,0.346123572451268,0.0784999999999998,0.0289395350672483,0.0130537744783035],"y":[0.222860196532869,0.701965232973014,0.0474525010499611,0.0236835454455727,0.0333387769715564,0.0135931219149001],"visible":false,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"square","color":"#00ff00"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#00ff00"}},{"x":[17.6999131915085,3.5399826383017,0.70799652766034,0.141599305532068,0.0283198611064136],"y":[4.61992648699552,3.54209405861394,2.90078046483438,1.26268331782491,0.334644373153112],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"diamond","color":"#ff0000"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#ff0000"},"error_y":{"type":"data","array":[0.25974566968982,0.265248088778428,0.0835678755881122,0.0410058092304212,0.0120636478546408],"visible":true,"thickness":2,"width":4,"color":"#ff0000"}},{"x":[17.6999131915085,3.5399826383017,0.70799652766034,0.141599305532068,0.0283198611064136],"y":[0.25974566968982,0.265248088778428,0.0835678755881122,0.0410058092304212,0.0120636478546408],"visible":false,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"triangle-up","color":"#00ffff"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#00ffff"}},{"x":[20,0.001],"y":[6.54504172319639,0.0759362106656637],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"cross","color":"#ff00ff"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#ff00ff"}}],"palette_obj":{"palette":"pyDefault","colors":["#0000ff","#00ff00","#ff0000","#00ffff","#ff00ff","#ffff00","#000000","#0000aa","#00aa00","#aa0000","#00aaaa","#aa00aa","#aaaa00"]}}'],
    ["y2",           '{"layout":{"showlegend":false,"legend":{"bordercolor":"#444","bgcolor":"#FFFFFF","xanchor":"left","yanchor":"middle","x":1.1,"y":0.5,"margin":{"autoexpand":true,"b":50,"l":50,"r":100,"t":50},"itemwidth":10},"xaxis":{"title":{"text":"x","font":{"color":"#000000","size":18},"standoff":0},"range":[],"type":"linear","mirror":"ticks","zeroline":false,"dtick":"","ticks":"inside","exponentformat":"power","ticklen":"5","tickcolor":"#000000","linecolor":"#000000","tickprefix":"","ticksuffix":"","showgrid":false,"tickfont":{"color":"#000000"},"minor":{"dtick":"","showgrid":false,"ticks":"inside","ticklen":2,"tickcolor":"#000000","linecolor":"#000000"}},"yaxis":{"title":{"text":"y","font":{"color":"#000000","size":18},"standoff":0},"range":[],"type":"linear","mirror":false,"zeroline":false,"dtick":"","ticks":"inside","exponentformat":"power","ticklen":5,"tickcolor":"#000000","linecolor":"#000000","tickprefix":"","ticksuffix":"","showgrid":false,"tickfont":{"color":"#000000"},"minor":{"showgrid":false,"dtick":"","ticks":"inside","ticklen":2,"tickcolor":"#000000","linecolor":"#000000"}},"yaxis2":{"title":{"text":"Y2","font":{"color":"#FF0000","size":18},"standoff":25},"overlaying":"y","side":"right","range":[],"type":"linear","mirror":false,"zeroline":false,"dtick":"","ticks":"inside","exponentformat":"power","ticklen":5,"tickcolor":"#FF0000","linecolor":"#FF0000","tickprefix":"","ticksuffix":"","showgrid":false,"tickfont":{"color":"#FF0000"},"minor":{"dtick":"","ticks":"inside","ticklen":2,"tickcolor":"#FF0000","linecolor":"#FF0000"}},"margin":{"b":80,"l":80,"r":230,"t":30},"font":{"family":"Segoe UI","size":14,"color":"#000000"},"width":530,"height":330,"paper_bgcolor":"#FFFFFF","plot_bgcolor":"#FFFFFF","use_error_bars":false},"traces":[{"x":[17.6990458957621,2.13728221778784,0.346123572451268,0.0784999999999998,0.0289395350672483,0.0130537744783035],"y":[3.66845263240629,2.31017363209877,1.44586524235294,0.723120573844419,0.184471042767296,0.143787253402463],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"square","color":"#0000ff"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#0000ff"},"error_y":{}},{"x":[17.6990458957621,2.13728221778784,0.346123572451268,0.0784999999999998,0.0289395350672483,0.0130537744783035],"y":[0.222860196532869,0.701965232973014,0.0474525010499611,0.0236835454455727,0.0333387769715564,0.0135931219149001],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y2","marker":{"size":5,"symbol":"square","color":"#ff0000"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#ff0000"}},{"x":[17.6999131915085,3.5399826383017,0.70799652766034,0.141599305532068,0.0283198611064136],"y":[4.61992648699552,3.54209405861394,2.90078046483438,1.26268331782491,0.334644373153112],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"square","color":"#00ff00"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#00ff00"},"error_y":{}},{"x":[17.6999131915085,3.5399826383017,0.70799652766034,0.141599305532068,0.0283198611064136],"y":[0.25974566968982,0.265248088778428,0.0835678755881122,0.0410058092304212,0.0120636478546408],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"square","color":"#00ffff"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#00ffff"}},{"x":[20,0.001],"y":[6.54504172319639,0.0759362106656637],"visible":true,"name":"","type":"","mode":"lines+markers","yaxis":"y","marker":{"size":5,"symbol":"square","color":"#ff00ff"},"line":{"shape":"spline","dash":"solid","width":2,"color":"#ff00ff"}}],"palette_obj":{"palette":"pyDefault","colors":["#0000ff","#00ff00","#ff0000","#00ffff","#ff00ff","#ffff00","#000000","#0000aa","#00aa00","#aa0000","#00aaaa","#aa00aa","#aaaa00"]}}']
]
// localStorage.clear()



// const {ipcRenderer}       = require('electron');

document.getElementById('gd').n_data_lim = 1000;



var log10 = function (y) {
  return Math.log(y) / Math.log(10);
}

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
  for(var j = 0; j< 50; j +=1){
    if( document.getElementById('app'+j.toString()) != null ){
      document.getElementById('app'+j.toString()).remove();
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
      name: {it: "text", def: "",},
      visible: {it: "option", options: ['true' , 'false' , "legendonly" ]},
      yaxis: {it: "option", options: ['y' , 'y2']},
      line: {
        width: {it: "number", def: default_line_width,},
        shape: {it: "option", options: ["spline", "linear", "hv", "vh", "hvh", "vhv"],},
        dash: {it: "option", options: ["solid", "dot", "dash", "longdash", "dashdot", "longdashdot"],},
        smoothing: {it: "number", def: 0,},
        color: {it: "option", options: colors_palettes[palette]},
      },
      mode: {it: "option", options: ['lines',"markers", 'text', 'none', 'lines+markers','lines+markers+text' ]},
      marker: {
        size: {it: "number", def: default_marker_size,},
        symbol: {it: "option", options: marker_shapes,},
        color: {it: "option", options: colors_palettes[palette]},
      },
      type: {it: "option", options: ["scattergl", 'bar']},
    },function(e){
        update();
        if(e.target.id == 'color'){
          var index = e.target.selectedIndex
          if(index >= 0){
            var color = e.target.options[index].text;
            e.target.style.background = color;  
          }
        }
    }));
  }
} 





var inputer_master_trace = new inputer("appM", {
    type: {it: "option", options: ["scattergl", 'bar']},
    yaxis: {it: "option", options: ['y' , 'y2']},
    line: {
      width: {it: "number", def: default_line_width,},
      shape: {it: "option", options: ["spline", "linear", "hv", "vh", "hvh", "vhv"],},
      dash: {it: "option", options: ["solid", "dot", "dash", "longdash", "dashdot", "longdashdot"],},
      smoothing: {it: "number", def: 0,},
    },
    mode: {it: "option", options: [ 'lines+markers', 'lines',"markers", 'text', 'none', 'lines+markers+text' ]},
    marker: {
      size: {it: "number", def: default_marker_size,},
      symbol: {it: "option", options: marker_shapes,},
      // color: {it: "option", options: colors_palettes["pyDefault"]},
    },
  }, function(e){
      var caller = e.target || e.srcElement || window.event.target || window.event.srcElement;
      console.log("callback id: ", caller.id);
      var value = e.target.value
      var key = e.target.id
      console.log("parent",parent );
      for(var j = 0; j< traces.length; j +=1){
        if(e.target.parentElement.previousElementSibling.innerHTML == "Master Trace:"){
          traces[j][key] = value
        }else{
          var parent_key = e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML;
          parent_key = parent_key.slice(0, parent_key.length-1);
          traces[j][parent_key][key] = value;
        }
        inputer_traces[j].update_data(traces[j]);
      }
      update();
});



function plot(header, data, update_nums=false){
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

  var palette_obj = document.getElementById("palettes")
  if (!palette_obj || palette_obj.options.length === 0) {
    console.error("Palette dropdown is empty or not initialized correctly.");
    // Initialize or set default options as needed
  }
  var palindex = palette_obj.selectedIndex;
  if(palindex == -1){
    palette_obj.selectedIndex = 0;
    palindex = 0;
  }
  var palette = document.getElementById("palettes").options[palindex].innerText;
  if(palette.endsWith("_")){
    if (isNaN(document.getElementById("n_colors").value) || document.getElementById("n_colors").value.trim() === "") {
      document.getElementById("n_colors").value = 3; 
    }
    palette = document.getElementById("n_colors").value.concat("_").concat(palette);
    palette = palette.slice(0, -1);
    console.log(palette)
  }


  for(var j = 0; j< datas.length; j +=1){
    datas[j][0] = datas[j][0].map(value => typeof value === 'string' ? parseFloat(value) : value);
    datas[j][1] = datas[j][1].map(value => typeof value === 'string' ? parseFloat(value) : value);

    if( j < traces.length){
      // Around the line where data is assigned to traces
      traces[j].x = datas[j][0];
      traces[j].y = datas[j][1];
      console.log('After assignment:', traces[0].x['length'], traces[0].y['length']); // Verify the data remains intact
    }else{

    var marker_shape = marker_shapes[j%marker_shapes.length];
    var line_shape = line_shapes[0];

    
  
    var color = colors_palettes[palette][j%colors_palettes[palette].length];
    


      var trace = {
          x: datas[j][0],
          y: datas[j][1],
          visible: true,
          name: headers[j],
          type: 'scattergl',
          mode: 'lines+markers',
          yaxis: "y",
          marker: {
              size: default_marker_size,
              symbol: marker_shape,
              color: color,
            },

        line: {
          shape: "spline",
          dash: line_shape,
          width: default_line_width,
              color: color,
        },
      }

    traces.push(trace)
    }
  }
  

  make_trace_boxes();
  for(var i = 0; i < traces.length; i ++ ){
    inputer_traces[i].update_data(traces[i]);
  }
  document.getElementById("n_colors").value = traces.length

  if(!update_nums){
    var layout = inputer_layout.get_data();
    layout.xaxis.title.text = header[0];
    layout.yaxis.title.text = header[1];
    if(traces.length >1){
      layout.showlegend = true;
    }else{
      layout.showlegend = false;
    }
    inputer_layout.update_data(layout);
  }

  document.getElementById("palettes").dispatchEvent(new Event('change')); // Force the inputer_traces color options box to update color 


  // traces = downSample(traces) // this just updates the downsample info 
  console.log('before plot:', traces[0].x['length'], traces[0].y['length']); // Verify the data remains intact
  // Plotly.newPlot(document.getElementById('gd'), traces, inputer_layout.get_data(), {
  Plotly.newPlot(document.getElementById('gd'), traces, layout, {
      
      modeBarButtonsToRemove: ['toImage', 'sendDataToCloud'],
      modeBarButtonsToAdd: [{
        name: 'To SVG',
        icon: Plotly.Icons.camera,
        click: function(gd) {
          // Plotly.downloadImage(gd, {format: 'svg'})
          save_plot("svg")
        }},{
        name: 'To PNG',
        icon: Plotly.Icons.camera,
        click: function(gd) {
          save_plot("png");
          // Plotly.downloadImage(gd, {format: 'png', scale:8})
        }
      }]
  },);
    console.log('after plot plot:', traces[0].x['length'], traces[0].y['length']); // Verify the data remains intact
};



var inputer_layout = new inputer("app", OPT_inputer_layout , function(e){
  update();
});


// function input_csv(selectedFile) {
//   Papa.parse(selectedFile, {
//     dynamicTyping: false,
//     complete: function(results) {
//       header = results.data[0]
//       datapoints = []

//       for(var i = 1; i < results.data.length; i ++){
//         row = []
//         for(var j = 0; j< header.length; j +=1){
//           x = parseFloat(results.data[i][j])
//           row.push(x)
//         }
//         datapoints.push(row)
//       }
//       datapoints = transpose(datapoints)
//       var update_date = false;
//       if( traces.length > 0){
//         update_date = true;
//       }
//       plot(header, datapoints, update_date)
//       update();
//       console.log("Loading csv")
//       // load_default_template()
//     }
//   })
// };



function save_plot(type){



  
  filename = filename.replace('.csv', '');
  filename = filename.replace('.json', '');
  filename = filename.replace('.J', '');
  filename = filename.replace('.svg', '');
  filename = filename.replace('.xlsx', '');
  console.log(filename)
  
  if( type == "png"){
    filename = filename
    Plotly.downloadImage(gd, {format: 'png', scale:8, filename})
    return;
  }
  if( type == "svg"){

  	// scattergl does not seem to save properly.... But it is FAST rendering!
    var plot = document.getElementById('gd');
    for (let i = 0; i < plot.data.length; i++) {
        if (plot.data[i].type === 'scattergl') {
            plot.data[i].type = 'scatter';
        }
    }
	 Plotly.redraw(plot);


    var svgContent = plot.querySelector('svg').cloneNode(true);

    var legend = plot.querySelector('.legend');
    if (legend) {
      svgContent.appendChild(legend.cloneNode(true));
    }

    var axesLabels = plot.querySelectorAll('.xtitle, .ytitle, .y2title');
    axesLabels.forEach(function (label) {
      svgContent.appendChild(label.cloneNode(true));
    });

    var json_text = get_template_text(true);

    var comment = document.createComment("layout=" + json_text + "endlayout");
    svgContent.appendChild(comment);

    var classesToRemove = ['nsewdrag', 'nwdrag', 'nedrag', 'swdrag', 'sedrag', 'ewdrag', 'wdrag', 'edrag', 'nsdrag', 'sdrag', 'ndrag'];
    classesToRemove.forEach(function(className) {
      var elementsToRemove = svgContent.querySelectorAll('.' + className);
      elementsToRemove.forEach(function(element) {
        element.remove();
      });
    });
    
    var svgData = new XMLSerializer().serializeToString(svgContent);
    // Replace all occurrences of vector-effect:non-scaling-stroke with an empty string
    //vector-effect:non-scaling-stroke
    svgData = svgData.replace(/vector-effect:\s*non-scaling-stroke;/g, '');

    var svgBlob = new Blob([svgData], { type: 'image/svg+xml' });

    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(svgBlob);
    downloadLink.download = filename + ".svg";

    const currentDate = new Date(); const year = currentDate.getFullYear(); const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); const day = currentDate.getDate().toString().padStart(2, '0'); const hour = currentDate.getHours().toString().padStart(2, '0'); const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const currentDateTimeString = `${year}-${month}-${day}--${hour}-${minute}`;
    
    console.log(currentDateTimeString);

    const svgName = currentDateTimeString.concat("_").concat(filename).concat(".svg")
    // ipcRenderer.send("archive_plot", [svgData, svgName]);
    // var dropdown = document.getElementById("archive_dropdown");
    // var opt = document.createElement("option");
    // opt.text = svgName;
    // dropdown.options.add(opt);  

    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);


    // Lets convert back to scattergl
    var plot = document.getElementById('gd');
    for (let i = 0; i < plot.data.length; i++) {
        if (plot.data[i].type == 'scatter') {
            plot.data[i].type = 'scattergl';
        }
    }
   Plotly.redraw(plot);



    // filename = filename
    // Plotly.downloadImage(gd, {format: 'png', scale:8, filename})

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

function import_svg(svg_text, update_data=true, update_trace_styles=true, update_trace_names = false, update_axes_labels=false, update_size_only=false){
    var splitStrings = svg_text.split("layout=");
    var layoutText = splitStrings[1].split("endlayout")[0]
    console.log(layoutText);
    import_json(layoutText, update_data, update_trace_styles, update_trace_names , update_axes_labels, update_size_only)
}

function import_json(json_text, update_data=true, update_trace_styles=true, update_trace_names = false, update_axes_labels=false, update_size_only=false){


  var prevLayout = inputer_layout.get_data();
  var json = JSON.parse(json_text);
  var l = json["layout"];

  document.getElementById("error_bars").checked = l.use_error_bars
  

  if(update_size_only){
    update_data = false;
    update_trace_names = false;
    update_trace_styles = false;
    update_axes_labels = false;
  }


if (!update_size_only) {
    var elem = document.getElementById("palettes");
    var colors = [...elem.options].map(o => o.value);
    var palette_obj = json["palette_obj"];
    pal = palette_obj["palette"]
    // Slice until the first underscore
    const underscoreIndex = pal.indexOf('_');
    if (underscoreIndex !== -1) {
        // Extract the number before the underscore and set it to the value
        document.getElementById("n_colors").value = parseInt(pal.slice(0, underscoreIndex));
        pal = pal.slice(underscoreIndex + 1);  // Slice after the underscore
        console.log(pal);
    }else{
      console.log("Palette  " + pal + " not found")
      console.log(JSON.stringify(palette_obj["colors"]))
    }

    var index = colors.indexOf(pal)
    if (index < 0 || index >= elem.options.length){
        // Get the dropdown element
        const dropdown = document.getElementById("palettes");

        // Create a new option element
        const newOption = document.createElement("option");

        // Set the value and text of the new option
        newOption.value = pal;
        newOption.text = pal;

        // Add the new option to the dropdown
        dropdown.insertBefore(newOption, dropdown.firstChild);

        colors_palettes[pal] = palette_obj["colors"];
        index = colors.indexOf(pal)
    }
    selectOption(elem, index);

    if (pal.endsWith("_")) {
        pal = pal.slice(0, -1);
        console.log(pal);
    }
    console.log(pal)
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
  var new_traces = json["traces"];


  for(var i = 0 ; i < new_traces.length &&  i < new_traces.length; i ++ ){
    new_traces[i]['name'] = decodeURIComponent(new_traces[i]['name'])
    // if( i % 2 == 0 && new_traces[i].hasOwnProperty("error_y") && new_traces[i]["error_y"].hasOwnProperty("array")  && new_traces[i]["error_y"]["array"].length > 0 ){
    //     document.getElementById("error_bars").checked = true
    // } else if (i % 2 == 0 && ( (!new_traces[i].hasOwnProperty("error_y") ) || (new_traces[i].hasOwnProperty("error_y") && !new_traces[i]["error_y"].hasOwnProperty("array"))  ) ){
    //     document.getElementById("error_bars").checked = false
    // }
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
  l.yaxis2.title.text  = decodeURIComponent(l.yaxis2.title.text);
  
  if(prev_data.length > 0 ){
    if( !update_axes_labels ){
      l.xaxis.title.text  = prevLayout.xaxis.title.text
      l.yaxis.title.text  = prevLayout.yaxis.title.text
    }
  }

  if(update_size_only){
    prevLayout.margin = l.margin
    prevLayout.width = l.width
    prevLayout.height = l.height
    inputer_layout.update_data(prevLayout);
  }else{
    inputer_layout.update_data(l);
  }

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
      // var index = colors_palettes[pal].indexOf(traces[i].marker.color);
      selectOption(inputer_traces[i].inputs.marker.color.elem,i%colors_palettes[pal].length);
      // index = colors_palettes[pal].indexOf(new_traces[i].line.color);
      selectOption(inputer_traces[i].inputs.line.color.elem,i%colors_palettes[pal].length);
    }
    
  }

  var la = inputer_layout.get_data()
  la.modebar = {}
  la.modebar.orientation = "v"

  Plotly.newPlot(document.getElementById('gd'), traces, la, {
    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud' ],
    modeBarButtonsToAdd: [

    {
      name: 'To SVG',
      icon: Plotly.Icons.camera,
      click: function(gd) {
        save_plot("svg");
      }
    },{
      name: 'To png',
      icon: Plotly.Icons.camera,
      click: function(gd) {
        save_plot("png");
      }
    }] // END modeBarButtonsToAdd,
    },); // END 

    update();


    // Update the colors in the color options dropdowns by triggering palette changed 
    var event = new Event('change');
    document.getElementById("palettes").dispatchEvent(event);
 

    const inputElement = document.getElementById('error_bars');
    const changeEvent = new Event('change');
    inputElement.dispatchEvent(changeEvent);


      
}

function update(){

  // set_y2_color();

  var plot = document.getElementById('gd');
  var xaxisRange = plot.layout.xaxis.range;
  var yaxisRange = plot.layout.yaxis.range;
  var y2axisRange = plot.layout.yaxis2.range;



  document.getElementById("gd_div").style.width = inputer_layout.get_data()['width'];
  for(var i = 0 ; i < traces.length; i ++){
      traces[i] = inputer_traces[i].fill_json(traces[i]);
      if(i < traces.length-1 && i % 2 == 0 ){
        if(document.getElementById("error_bars").checked){
        traces[i]["error_y"] = {
            type: 'data',
            array: traces[i+1].y,
            visible: true,
            thickness: traces[i].line.width,
            width: traces[i].line.width*2,
            color: traces[i].marker.color, 
          }
        // inputer_traces[i+1].inputs.visible.elem.selectedIndex = 1 
        traces[i+1].visible = false
          
      }else{
        traces[i]["error_y"] = {}
        // inputer_traces[i+1].inputs.visible.elem.selectedIndex = 0
        traces[i+1].visible = true
      }
    }
    inputer_traces[i].update_data(traces[i]);
  }

  var l = inputer_layout.get_data();

  if(document.getElementById("ignore_zoom_check").checked){
    l.xaxis.range = xaxisRange
    l.yaxis.range = yaxisRange
    l.yaxis2.range = y2axisRange
  }


  Plotly.relayout(document.getElementById('gd'), l);



}

function get_template_text(curZoom=false){



  for(var i = 0 ; i < traces.length; i ++){
    traces[i].name = traces[i].name.replace(/\s/g,' ');
    traces[i].name = encodeURIComponent(traces[i].name)
  }
  
  var layout = inputer_layout.get_data();

  if(curZoom){
    var plot = document.getElementById('gd');
    layout.xaxis.range = plot.layout.xaxis.range;
    layout.yaxis.range = plot.layout.yaxis.range;

    layout.yaxis2.range = plot.layout.yaxis2.range;
  }

  layout.xaxis.title.text  = encodeURIComponent(layout.xaxis.title.text);
  layout.yaxis.title.text  = encodeURIComponent(layout.yaxis.title.text);
  layout.yaxis2.title.text  = encodeURIComponent(layout.yaxis2.title.text);


  var index = document.getElementById("palettes").selectedIndex
  var palette = document.getElementById("palettes").options[index].innerText;
  if(palette.endsWith("_")){
    if (isNaN(document.getElementById("n_colors").value) || document.getElementById("n_colors").value.trim() === "") {
      document.getElementById("n_colors").value = 3; 
    }
    palette = document.getElementById("n_colors").value.concat("_").concat(palette).slice(0, -1);;
  }
  console.log("Need to save " + JSON.stringify(colors_palettes[palette]))

  var use_error_bars  = document.getElementById("error_bars").checked
  console.log("saving svg with error bars " + use_error_bars);
  layout.use_error_bars = use_error_bars

  var colors   = colors_palettes[palette];
  var palette_obj = {palette , colors}

  var json = {layout, traces, palette_obj }
  var text = JSON.stringify(json);

  for(var i = 0 ; i < traces.length; i ++){
    traces[i].name = decodeURIComponent(traces[i].name);
  }
  return text;
}






document.getElementById('helper_reset_markers').addEventListener( 'click', function(){
  console.log("helper_reset_markers")
  
  for(var i = 0; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.marker.symbol.elem.selectedIndex = i%inputer_traces[i].inputs.marker.symbol.elem.options.length
  }
  update();
});


document.getElementById('helper_reset_colors').addEventListener( 'click', function(){
  console.log("helper_reset_colors")
  
  for(var i = 0; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.marker.color.elem.selectedIndex = i%inputer_traces[i].inputs.marker.color.elem.options.length
    inputer_traces[i].inputs.line.color.elem.selectedIndex = i%inputer_traces[i].inputs.line.color.elem.options.length
  }
  update();
});

document.getElementById('helper_reset_linestyles').addEventListener( 'click', function(){
  console.log("helper_reset_linestyles")
  
  for(var i = 0; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.line.dash.elem.selectedIndex = i%inputer_traces[i].inputs.line.dash.elem.options.length
  }
  update();
});


document.getElementById('helper_pair_colors').addEventListener( 'click', function(){
  console.log("helper_pair_colors")
  
  var j = 0;
  for(var i = 0; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.marker.color.elem.selectedIndex = j
    inputer_traces[i].inputs.line.color.elem.selectedIndex = j
    i += 1
    if(i >= inputer_traces.length){
      break
    }
    inputer_traces[i].inputs.marker.color.elem.selectedIndex = j
    inputer_traces[i].inputs.line.color.elem.selectedIndex = j
    j+=1
  }
  update();
});

document.getElementById('helper_pair_markers').addEventListener( 'click', function(){
  console.log("helper_pair_markers")
  
  var j = 0;
  for(var i = 0; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.marker.symbol.elem.selectedIndex = j;
    i += 1
    if(i >= inputer_traces.length){
      break
    }
    inputer_traces[i].inputs.marker.symbol.elem.selectedIndex = j+8;
    j += 1;
  }
  update();
});


document.getElementById('helper_alternate_markers').addEventListener( 'click', function(){
  console.log("helper_alternate_markers")
  
  var j = 0;
  for(var i = 2; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.marker.symbol.elem.selectedIndex = inputer_traces[0].inputs.marker.symbol.elem.selectedIndex;
    i += 1
    if(i >= inputer_traces.length){
      break
    }
    inputer_traces[i].inputs.marker.symbol.elem.selectedIndex = inputer_traces[1].inputs.marker.symbol.elem.selectedIndex;
    j += 1;
  }
  update();
});

document.getElementById('helper_alternate_linestyles').addEventListener( 'click', function(){
  console.log("helper_alternate_linestyles")
  
  for(var i = 0; i < inputer_traces.length; i += 1 ){
    inputer_traces[i].inputs.line.dash.elem.selectedIndex = inputer_traces[0].inputs.line.dash.elem.selectedIndex;
    i += 1
    if(i >= inputer_traces.length){
      break
    }
    inputer_traces[i].inputs.line.dash.elem.selectedIndex = inputer_traces[1].inputs.line.dash.elem.selectedIndex;
  }
  update();
});


document.getElementById('helper_to_log').addEventListener( 'click', function(){
  console.log("helper_to_log")
  var layout = inputer_layout.get_data();
  layout.xaxis.type = "log"
  layout.xaxis.dtick = "1"
  layout.yaxis.type = "log"
  layout.yaxis.dtick = "1"
  layout.yaxis2.type = "log"
  layout.yaxis2.dtick = "1"
  inputer_layout.update_data(layout);
  update();
  Plotly.relayout('gd', {
      'xaxis.autorange': true,  // Autoscale the x-axis
      'yaxis.autorange': true   // Autoscale the y-axis
  });
});


document.getElementById('helper_to_lin').addEventListener( 'click', function(){
  console.log("helper_to_lin")
  var layout = inputer_layout.get_data();
  layout.xaxis.type = "linear"
  layout.xaxis.dtick = ""
  layout.yaxis.type = "linear"
  layout.yaxis.dtick = ""
  layout.yaxis2.type = "linear"
  layout.yaxis2.dtick = ""
  inputer_layout.update_data(layout);
  update();
  Plotly.relayout('gd', {
      'xaxis.autorange': true,  // Autoscale the x-axis
      'yaxis.autorange': true   // Autoscale the y-axis
  });
});





// document.getElementById('helper_set_y2_color').addEventListener( 'change',  function(){set_y2_color(); update();});
  

// function set_y2_color(){
//     if(document.getElementById('helper_set_y2_color').checked == false){
//       return;
//     }
//     for(var i = 0; i < inputer_traces.length; i += 1 ){
//     var axis = inputer_traces[i].inputs.yaxis.elem[inputer_traces[i].inputs.yaxis.elem.selectedIndex].text
//     if(axis == "y2"){
//       var color = inputer_traces[i].inputs.marker.color.elem[inputer_traces[i].inputs.marker.color.elem.selectedIndex].text
//       var layout = inputer_layout.get_data();

//       layout.yaxis2.tickcolor = color
//       layout.yaxis2.linecolor = color
//       layout.yaxis2.tickfont.color = color
//       // layout.yaxis2.title.font.color = color
//       inputer_layout.update_data(layout);
//     }
//   }
// }



document.getElementById("palettes").addEventListener("change", function (){
   console.log("Color Palette selected ");
   var index = document.getElementById("palettes").selectedIndex;
   
   // Ensure there's always a valid selection
   if(index === -1){
     index = 0;  // Set to first index if none is selected
     document.getElementById("palettes").selectedIndex = index;
   }
   
   var colorObj = document.getElementById("palettes").options[index];
   // Check if colorObj is a valid object
   if (!colorObj || typeof colorObj !== 'object') {
       console.log("invalid color object");
       return; // Exit if not valid
   }

   var color = colorObj.innerText;

  var color = colorObj.innerText
  if(color.endsWith("_")){
    var n_colors = document.getElementById("n_colors").value
    console.log("n_colors ", n_colors);
    if(n_colors>50){
      n_colors = 50;
    }
    else if(n_colors<3){
      n_colors = 3;
    }
    color = n_colors.toString().concat("_").concat(color.slice(0, color.length-1));
  }
  if( colors_palettes[color] == undefined ){
    return;
  }


  document.getElementById("error_bars").addEventListener('change', function() {
      
      
      var layout = inputer_layout.get_data();
      layout.error_bars = document.getElementById("error_bars").checked;
      inputer_layout.update_data(layout);

      for(var i = 0 ; i < traces.length; i ++){
        if(i < traces.length-1 && i % 2 == 0 ){
          if(document.getElementById("error_bars").checked){
          inputer_traces[i+1].inputs.visible.elem.selectedIndex = 1 
            
        }else{
          inputer_traces[i+1].inputs.visible.elem.selectedIndex = 0
        }
      }
    }
    update();
  });

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



var input = document.getElementById('input_file')
input.addEventListener("change", function (){
	if (!this.files && !this.files[0]) {
		return;
	}
	console.log("Inputting file")
	console.log(this.files[0]);
	filename = this.files[0].name
	load_file(this.files[0])
});

// function resetFileInput() {
//     var fileInput = document.getElementById('input_file');
//     fileInput.type = 'text';  // Change the type temporarily to allow cloning
//     var newFileInput = fileInput.cloneNode(true);
//     newFileInput.type = 'file';  // Change the type temporarily to allow cloning
//     fileInput.parentNode.replaceChild(newFileInput, fileInput);
//   newFileInput.addEventListener('change', input_file_event);
// }


function  input_file_event(){
  if (!this.files && !this.files[0]) {
    return;
  }
  console.log("Inputting file")
  console.log(this.files[0]);
  filename = this.files[0].name
  load_file(this.files[0])
  // resetFileInput();
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
          // event.sender.send('load_file-task-finished', [false, data]); 
      load_default_template();
    }

  
  }else if( name.endsWith(".xlsx") ){

    var reader = new FileReader();
    
    reader.onload = function(e) {
        var data = e.target.result;
        var header = []
      const wb = XLSX.read(data, {type: 'binary'});
      const sheet = wb.Sheets[wb.SheetNames[0]]
      console.log(sheet);
      for(var n =0; n < 100; n ++ ) {
        var cell = String.fromCharCode(65 + n);
        if( sheet[cell.concat("1")] == undefined){
          header.push('');
        }else{
          header.push(sheet[cell.concat("1")].v)
        }
      }

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
  }
    reader.readAsBinaryString(file);

  }

  if(name.endsWith(".json")){
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
      import_json(e.target.result, true, true, true, true)
    });reader.readAsBinaryString(file);
  }

  if(name.endsWith(".svg")){
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
      import_svg(e.target.result, true, true, true, true)
    });reader.readAsBinaryString(file);
  }

}

// ipcRenderer.on("load_ArchivedPlots", function(event, arg){
//   import_svg(arg, true, true, true, true)


document.getElementById('add_palette').addEventListener( 'click', function(){

  var cur_palette = document.getElementById("palettes").options[document.getElementById("palettes").selectedIndex].innerText;
  if(cur_palette.endsWith("_")){
    cur_palette = document.getElementById("n_colors").value.concat("_").concat(cur_palette);
    cur_palette = cur_palette.slice(0, -1);
    console.log(cur_palette)
  }

    var palette = prompt("Input palette", JSON.stringify(colors_palettes[cur_palette]));
    if( palette == ""){
      return;
    }
    var name = prompt("Input name", "new " +cur_palette  );
    if( name == ""){
      return;
    }

    localStorage.setItem("LocalStoragePalette_".concat(name), palette);


    // Get the dropdown element
    const dropdown = document.getElementById("palettes");

    // Create a new option element
    const newOption = document.createElement("option");

    // Set the value and text of the new option
    newOption.value = name;
    newOption.text = name;

    // Add the new option to the dropdown
    dropdown.insertBefore(newOption, dropdown.firstChild);

    colors_palettes[name] = JSON.parse(palette);
    

});

document.getElementById("delete_palette").addEventListener('click', function(){

  var dropdown = document.getElementById("palettes");
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  var selectedText = selectedOption.text;

  var name = "LocalStoragePalette_" + selectedText;
  console.log("Deleting " + name)

  var item = localStorage.getItem(name);

  if (item !== null) {
    console.log('Item exists in localStorage');
    localStorage.removeItem(name);
    dropdown.options[dropdown.selectedIndex].remove();
  } else {
    console.log('Item does not exist in localStorage');
  }
});


document.getElementById('save_template').addEventListener( 'click', function(){

    var name_ = prompt("Enter name of template to save:");
    if( name_ == ""){
      return;
    }


    var json_text = get_template_text();
    localStorage.setItem("LocalStorageTemplate_".concat(name_), json_text);

});

function load_templ(index){
  var update_trace_styles = document.getElementById("update_trace_styles_check").checked;
  var update_trace_names = document.getElementById("update_trace_names_check").checked;
  var update_axes_labels = document.getElementById("update_axes_labels_check").checked;
  var update_size_only = document.getElementById("update_size_only_check").checked;

  import_json(templates_list[index][1], false, update_trace_styles, update_trace_names, update_axes_labels, update_size_only);
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
  if (key.startsWith("LocalStorageTemplate_")) {
    // Retrieve the value associated with the key
    var value = localStorage.getItem(key);

    templates_list.push([key.split("_")[1], value])

    // Perform your desired operations with the key and value
    // console.log("Key: " + key + ", Value: " + value);
  }

  if (key.startsWith("LocalStoragePalette_")) {
    var value = localStorage.getItem(key);
    var name = key.split("_")[1]
    console.log("Found user palette " + name + ": " + value);

    // Get the dropdown element
    const dropdown = document.getElementById("palettes");

    // Create a new option element
    const newOption = document.createElement("option");

    // Set the value and text of the new option
    newOption.value = name;
    newOption.text = name;

    // Add the new option to the dropdown
    dropdown.insertBefore(newOption, dropdown.firstChild );

    colors_palettes[name] = JSON.parse(value);
  }

  
}


for (let i = 0; i < templates_list.length; i++) {
  var opt = document.createElement("option");
  opt.text = templates_list[i][0];
  dropdown.options.add(opt);
}
dropdown.onchange =  change_template;
document.getElementById("template_div").appendChild(dropdown);


function load_default_template(){
  for (var i = 0; i < dropdown.options.length; i++) {
    var option = dropdown.options[i];
    var optionValue = option.value;
    var optionText = option.text;
    console.log("Option " + i + ": Value=" + optionValue + ", Text=" + optionText);
    if( optionText == "user-default"){
      load_templ(i);
      console.log("Loading default")
      dropdown.selectedIndex = i
      return;
    }  
  }
  load_templ(0);
}


document.getElementById("delete_template").addEventListener('click', function(){
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  var selectedText = selectedOption.text;

  var name = "LocalStorageTemplate_" + selectedText;
  console.log("Deleting " + name)

  var item = localStorage.getItem(name);

  if (item !== null) {
    console.log('Item exists in localStorage');
    localStorage.removeItem(name);
    dropdown.options[dropdown.selectedIndex].remove();
  } else {
    console.log('Item does not exist in localStorage');
  }
});

// document.getElementById('make_default_template').addEventListener( 'click', function(){

//     var json_text = get_template_text();
//     var name_ = "user-default"
//     localStorage.setItem("LocalStorageTemplate_".concat(name_), json_text);

// });

load_default_template()


document.getElementById('ignore_zoom_check').addEventListener('click', function(){
  update();
})


document.getElementById("n_colors").addEventListener('input', function(){
  document.getElementById("palettes").dispatchEvent(new Event('change'));
})

document.getElementById('helper_save_current_zoom').addEventListener('click', function(){
  
  var plot = document.getElementById('gd');
  var layout = inputer_layout.get_data();
  
  layout.xaxis.range = plot.layout.xaxis.range
  layout.yaxis.range = plot.layout.yaxis.range

  layout.yaxis2.range = plot.layout.yaxis2.range

  inputer_layout.update_data(layout);
})



document.getElementById('exportData').addEventListener('click', function() {

	var layout = inputer_layout.get_data();
	var x = layout.xaxis.title.text
	var y = layout.yaxis.title.text

	const separator = ','; // Change this to your desired separator
	const filename = 'exported_data';

	const rows = [];

	// Iterate over data points for each trace
	for (let i = 0; i < Math.max(...traces.map(trace => trace.x.length)); i++) {
	  const rowData = [];

	  for (const trace of traces) {
	    // Check if the current trace has data for the current index
	    if (i < trace.x.length) {
	      rowData.push(trace.x[i] || ''); // Insert 'x' data or an empty string if data is missing
	      rowData.push(trace.y[i] || ''); // Insert 'y' data or an empty string if data is missing
	    } else {
	      // If no data is available for the current index, insert empty strings
	      rowData.push('');
	      rowData.push('');
	    }

	    // Add an empty column after every trace in both header and data
	    rowData.push('');
	  }

	  rows.push(rowData.join(separator));
	}

	// Add an empty column in headers for every trace
	const header = traces.flatMap(trace => [`${x}`, `${y} (${trace.name})`, '']);

	// Create CSV content
	const csvContent = [header.join(separator), ...rows].join('\n');

	// Create a Blob containing the CSV data
	const blob = new Blob([csvContent], { type: 'text/csv' });

	// Create a download link
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = `${filename}.csv`;

	// Trigger the download
	document.body.appendChild(a);
	a.click();

	// Clean up
	URL.revokeObjectURL(url);
	document.body.removeChild(a);
});


// // document.getElementById('downsample_size').addEventListener('change', function() {
// //     // Get the current value of the input
// //     let currentValue = parseInt(document.getElementById('downsample_size').value);
// //     // If the value is NaN or negative, set it to 1000
// //     if (isNaN(currentValue) || currentValue <= 0) {
// //         currentValue = 10000;
// //     }
// //     document.getElementById('gd').n_data_lim = currentValue;
// //     update();
// // });



