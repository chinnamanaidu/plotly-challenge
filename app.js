// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData


var metaNnamesPrase = [];
var inputnameData = [];
var samples = [];
var washfreq=0;
var demoVal = d3.select("#sample-metadata");


function optionChanged(inputValue) {

  demoVal = d3.select("#sample-metadata");
  demoVal.html("");

  //updating demographic data metadata
  metaNnamesPrase.forEach(function(element) {

    
    if ( inputValue == element.id) {
      var selId = demoVal.append("h5");
      selId.text(`ID :${element.id}`);
      console.log(element.id);

      var selEth = demoVal.append("h5");
      selEth.text(`Ethnicity :${element.ethnicity}`);
      console.log(element.ethnicity);

      var selGnd = demoVal.append("h5");
      selGnd.text(`Gender :${element.gender}`);
      console.log(element.gender);

      var selAge = demoVal.append("h5");
      selAge.text(`Age :${element.age}`);
      console.log(element.age);

      var selLct = demoVal.append("h5");
      selLct.text(`Location :${element.location}`);
      console.log(element.location);

      var selBbt = demoVal.append("h5");
      selBbt.text(`Bbtype :${element.bbtype}`);
      console.log(element.bbtype);

      var selWfr = demoVal.append("h5");
      selWfr.text(`Wfreq :${element.wfreq}`);
      washfreq = element.wfreq;
      console.log(element.wfreq);

    }


 
});

barVal = d3.select("#bar");
barVal.html("");

console.log("samples");
console.log(samples);

var samplesfiltered = samples.filter(samData =>samData.id == inputValue);
console.log(samplesfiltered);

//preparing the bar chart

// Sort the data array using the greekSearchResults value
samplesfiltered.sort(function(a, b) {
  return parseFloat(b.sample_values) - parseFloat(a.sample_values);
});

var sampleOtuIds = samplesfiltered[0].otu_ids;
var samplesVal = samplesfiltered[0].sample_values;
var sampleOtuLabels = samplesfiltered[0].otu_labels;

sampleOtuIds = sampleOtuIds.slice(0, 10);
samplesVal = samplesVal.slice(0, 10);
sampleOtuLabels = sampleOtuLabels.slice(0, 10);

// Reverse the array due to Plotly's defaults
sampleOtuIds = sampleOtuIds.reverse();
samplesVal = samplesVal.reverse();
sampleOtuLabels = sampleOtuLabels.reverse();

//  Check to make sure your are filtering your movies.
console.log(samplesfiltered);
console.log("sampleOtuIds");
console.log(sampleOtuIds);
console.log("samplesVal");
console.log(samplesVal);
console.log("sampleOtuLabels");
console.log(sampleOtuLabels);


var outId_append = [];
for (k=0; k<sampleOtuIds.length; k++)
outId_append[k] = "OTU " +sampleOtuIds[k];

// Use the map method with the arrow function to return all the filtered movie titles.
//var titles = filteredMovies.map(movies =>  movies.title);

// Use the map method with the arrow function to return all the filtered movie metascores.
//var ratings = filteredMovies.map(movies => movies.metascore);



var trace1 = {
  x: samplesVal,
  y: outId_append,
  text: `${sampleOtuIds} ${sampleOtuLabels}`,
  type: "bar",
  width: "25px",
  orientation: "h"
};





// data
var chartData = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "otus search results",
  margin: {
    l: 60,
    r: 5,
    t: 50,
    b: 60
  },  
  xaxis: {
    title: "OTU Sample Values",
    type: "integer"
  },
  yaxis: {
    autorange: [true],
    label: sampleOtuIds,
    y: sampleOtuIds,
    type: "integer"
  },
  width: "600px",
  height: "500px"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", chartData, layout);

//This is for the bubble chart preparation

var sampleOtuIdsFull = samplesfiltered[0].otu_ids;
var samplesValFull = samplesfiltered[0].sample_values;
var sampleOtuLabelsFull = samplesfiltered[0].otu_labels;



    
var rgbList = [];

function getRgb() {
  var ii=93;
  var yy=164;
  var jj=214;
  for (i=0;i<sampleOtuIdsFull.length; i++) {
    rgbList[i] ='rgb('+ii+','+yy+','+jj+')';
    if (yy<255) {
      yy=yy+25;
    } else if (jj <255) {
      jj=jj+25;
    } else if (ii <255) {
      ii=ii+25;
    } else {
      ii=0;
      yy=10;
      jj=10;
    }

  }

}
getRgb();
var opaList = [];
function setOpaCity() {
  var iii=0.6;

  for (i=0;i<sampleOtuIdsFull.length; i++) {
    opaList[i] =iii;
    if (iii>1) {
      iii = 0.6;
    } else {
      iii = iii+0.1;
    }

  }

}
setOpaCity();
console.log("rgbList");
console.log(rgbList);
console.log("opacity");
console.log(opaList);
var trace2 = {
  x: sampleOtuIdsFull,
  y: samplesValFull,
  mode: "markers",
  text: sampleOtuLabelsFull,
  marker: {
    color: rgbList,
    opacity: opaList,
    size: samplesValFull
  }
};

var chartData2 = [trace2];

var layout2 =  {
  title: 'Bubble chart OTUs and Samplevalues',
  showlegend: false,
  height: 600,
  width: 1000
};

// Use filter() to pass the function as its argument

Plotly.newPlot("bubble", chartData2, layout2);

//This is for gauge chart
// Enter a speed between 0 and 180
var level =  washfreq;
console.log("washfreq");
console.log(level);
var leveldeg = level*20;
// Trig to calc meter point
var degrees = 0 + leveldeg,
	 radius = .5;
var radians = degrees * Math.PI / 180;
var x = -1*radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	 pathX = String(x),
	 space = ' ',
	 pathY = String(y),
	 pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data3 = [{ type: 'scatter',
   x: [0], y:[0],
	marker: {size: 28, color:'850000'},
	showlegend: false,
	name: 'wash frequency',
	text: level,
	hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,  50],
  rotation: 90,
  text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1',''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
						 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
						 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .6)', 'rgba(10, 200, 75, .7)', 'rgba(100, 200, 75, .8)', 'rgba(100, 75, 75, .9)',
						 'rgba(255, 255, 255, 0)']},
  labels: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1',''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout3 = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: { text: '<b>Belly Button Washing Frequency </b> <br> Washing Frequency per week', font: { size: 24 } },	  
  height: 500,
  width: 500,
  xaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]}
};


Plotly.newPlot('gauge', data3, layout3);
}

d3.json("samples.json").then((incomingData) => {

   
var inputElement = d3.select("#selDataset");




    
  metaNnamesPrase = incomingData.metadata;
  inputnameData = incomingData.names;
  samples = incomingData.samples;
  
  //  Check to make sure your are filtering your movies.
    console.log(incomingData);
    console.log(incomingData.names);



    for (var j = 0; j < inputnameData.length; j++) {
 
      var selOpt = inputElement.append("option");
      selOpt.attr("value",inputnameData[j]);
      selOpt.text(inputnameData[j]);
        console.log(inputnameData[j]);
    }
  
    var inputValue = inputElement.property("value");

    console.log("inputValue");
    console.log(inputValue);



  
optionChanged(inputValue);

// Use filter() to pass the function as its argument

  });
  