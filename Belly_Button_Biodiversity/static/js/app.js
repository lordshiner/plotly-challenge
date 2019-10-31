function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  const  url = "/metadata/<sample>";
  // Use `d3.json` to fetch the metadata for a sample
  var data = d3.json(url);
  data = [data]
    // Use d3 to select the panel with id of `#sample-metadata`
  const panel = d3.select("#sample-metadata");  
    // Use `.html("") to clear any existing metadata
  panel.html("");  
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (let [key, value] of Object.entries(data)){
      panel.append("p").text(`${key}: ${value}`);
    }
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    var layout = { title: 'Gauge', width: 600, height: 600, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", data[6], layout);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  const  url = "/samples/<sample>";
  var data = d3.json(url);
  data = [data];
    // @TODO: Build a Bubble Chart using the sample data
    var layout1 = {
      title: 'Bubble Chart',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data[1], layout1);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var values2 = data[1].slice(0,10)

    var data2 = [{
      values: values2,
      type: 'pie'
    }];
    
    var layout2 = {
      title: "Pie Chart",
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('pie', data2, layout2);
    
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
