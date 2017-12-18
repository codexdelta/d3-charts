// let zoom = require('../plugins/zoom');

/**
 * A function to draw bar chart.
 */
function drawScatterChart(d3, data) {


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

  // uncomment
  // start of drag
  // let bandPos = [-1, -1];
  // let pos;
  // let drag = d3.behavior.drag();
  // let xdomain = 100;
  // let ydomain = 100;
  // let zoomArea = {
  //   x1: 0,
  //   x2: 0,
  //   x2: xdomain,
  //   y2: ydomain
  // };
  // end of drag


  // let brush = d3.svg.brush().x(x).y(y).on("brushend", brushed);
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

function drawDots(){
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


  // let svg = d3.select("body")
  //     .append("svg")
  //     .attr("id", "map")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .call(zoom)
  //     ;


  function zoomed(){
      map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
    // scroll zoom function end

    // uncomment
    // start of drag experiment
    // let zoomOverlay = scatter.append('rect')
    //   .attr('width', width - 10)
    //   .attr('height', height)
    //   .attr('class', "zoomOverlay")
    //   .call(drag);

    // zoom();
    // uncomment
    // drag.on('dragend', function(){
    //   let pos = d3.mouse(this);
    //   let x1 = x.invert(bandPos[0])
    //   let x2 = x.invert(pos[0]);
    //
    //   if (x1 < x2){
    //     zoomArea.x1 = x1;
    //     zoomArea.x2 = x2;
    //   } else  {
    //     zoomArea.x1 = x2;
    //     zoomArea.x2 = x1;
    //   }
    //
    //   let y1 = y.invert(pos[1]);
    //   let y2 = y.invert(bandPos[1]);
    //
    //   if (x1 < x2){
    //     zoomArea.y1 = y1;
    //     zoomArea.y2 = y2;
    //   } else {
    //     zoomArea.y1 = y2;
    //     zoomArea.y2 = y1;
    //   }
    //
    //   bandPos = [-1, -1];
    //   d3.select('.band').transition()
    //     .attr('width', 0)
    //     .attr('height', 0)
    //     .attr('x', bandPos[0])
    //     .attr('y', bandPos[1]);
    //
    //   zoom();
    // });

    // drag.on("drag", function() {
    //   let pos = d3.mouse(this);
    //
    //   if (pos[0] < bandPos[0]) {
    //     d3.select(".band").
    //     attr("transform", "translate(" + (pos[0]) + "," + bandPos[1] + ")");
    //   }
    //   if (pos[1] < bandPos[1]) {
    //     d3.select(".band").
    //     attr("transform", "translate(" + (pos[0]) + "," + pos[1] + ")");
    //   }
    //   if (pos[1] < bandPos[1] && pos[0] > bandPos[0]) {
    //     d3.select(".band").
    //     attr("transform", "translate(" + (bandPos[0]) + "," + pos[1] + ")");
    //   }
    //
    //   //set new position of band when user initializes drag
    //   if (bandPos[0] == -1) {
    //     bandPos = pos;
    //     d3.select(".band").attr("transform", "translate(" + bandPos[0] + "," + bandPos[1] + ")");
    //   }
    //
    //   d3.select(".band").transition().duration(1)
    //     .attr("width", Math.abs(bandPos[0] - pos[0]))
    //     .attr("height", Math.abs(bandPos[1] - pos[1]));
    // });

    // function zoom() {
    //   //recalculate domains
    //   if (zoomArea.x1 > zoomArea.x2) {
    //     x.domain([zoomArea.x2, zoomArea.x1]);
    //   } else {
    //     x.domain([zoomArea.x1, zoomArea.x2]);
    //   }
    //
    //   if (zoomArea.y1 > zoomArea.y2) {
    //     y.domain([zoomArea.y2, zoomArea.y1]);
    //   } else {
    //     y.domain([zoomArea.y1, zoomArea.y2]);
    //   }
    //
    //   //update axis
    //   var t = svg.transition().duration(750);
    //   svg.select(".xAxis").transition(t).call(xAxis);
    //   svg.select(".yAxis").transition(t).call(yAxis);
    //
    //   drawDots();
    //   // t.selectAll(".line").attr("d", line);
    // }

    // uncomment
    // zoomOverlay.on('dblclick', function(){
    //   debugger
    //   x.domain([0, xdomain]);
    //   y.domain([0, ydomain]);
    //   var t = svg.transition().duration(750);
    //   svg.select(".xAxis").transition(t).call(xAxis);
    //   svg.select(".yAxis").transition(t).call(yAxis);
    //   drawDots();
    // });
}


module.exports = drawScatterChart;
