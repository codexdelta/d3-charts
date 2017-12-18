// let zoom = require('../plugins/zoom');

/**
 * A function to draw bar chart.
 */
function drawScatterChart(d3, data) {

  let zooming = false;
  let margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50
  };
  let width = 900 - margin.left - margin.right;
  let height = 480 - margin.top - margin.bottom;

  let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  let x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data.map(function(d) {
      return d.x;
    }))])
    .nice();

  let y = d3.scale.linear()
    .range([height, 0])
    .domain([0, d3.max(data.map(function(d) {
      return d.y;
    }))])

  let xAxis = d3.svg.axis().scale(x).orient('bottom');
  let yAxis = d3.svg.axis().scale(y).orient('left');

  let idleTimeout;
  let idleDelay = 350;

  let zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  let svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

  let map = svg.append("g");

  map.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#fff");


  let clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  let xExtent = d3.extent(data, function(d) {
    return d.x;
  });
  let yExtent = d3.extent(data, function(d) {
    return d.y;
  });
  x.domain(d3.extent(data, function(d) {
    return d.x;
  })).nice();
  y.domain(d3.extent(data, function(d) {
    return d.y;
  })).nice();

  let band = svg.append('rect')
    .attr('width', 0)
    .attr('height', 0)
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', 'band');


  let scatter = svg.append("g")
    .attr("id", "scatterplot")
    .attr("clip-path", "url(#clip)");

  function drawDots() {
    map.selectAll(".dot").remove();
    map.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function(d) {
        return x(d.x);
      })
      .attr("cy", function(d) {
        return y(d.y);
      })
      .attr("opacity", 0.5)
      .style("fill", "#4292c6");
  }

  drawDots();

  // x axis
  svg.append("g")
    .attr("class", "xAxis")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("text")
    .style("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 8)
    .text("X Label");

  // y axis
  svg.append("g")
    .attr("class", "yAxis")
    .attr('id', "axis--y")
    .call(yAxis);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text("Y Label");


  // scroll zoom function start

  d3.select("body").on("keydown", function() {
    zooming = d3.event.ctrlKey;
  });
  d3.select("body").on("keyup", function() {
    zooming = false;
  });

  function zoomed() {
    if (zooming){
      map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

  }
  // scroll zoom function end


}


module.exports = drawScatterChart;
