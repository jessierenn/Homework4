function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var select_metadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    select_metadata.html("");
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
    function generatePieChart(name) {    
    
      var url = "/samples/"+name
      Plotly.d3.json(url, function(response) {
  
          console.log(response);
          var sampleData = response[0];
          var data = [{
              values: sampleData.sample_values.slice(0,9),
              labels: sampleData.otu_ids.slice(0,9),
              type: 'pie',
              
            }];
            
            var layout = {
              title: "OTU per Sample",
              yaxis: {
                  autorange: true}
  
            };
  
          Plotly.newPlot("piePlot", data, layout);
      });
      
  }
  
  function generateBubbleChart(name){
      var url = "/samples/"+name
      Plotly.d3.json(url, function(error, response) {
          var sampleData = response[0];
          var trace1 = {
              x: sampleData.otu_ids,
              y: sampleData.sample_values,
              mode: 'markers',
              marker: {
                size: sampleData.sample_values,
                color:sampleData.otu_ids              
              }
            };
            
            var data = [trace1];
            
            var layout = {
             
              title: 'OTU vs Sample_values',
              showlegend: false,
              yaxis: {
                  autorange: true}
              
            };
            
            Plotly.newPlot('bubblePlot', data, layout);
      });
  }
  
  
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
