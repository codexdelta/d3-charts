
/**
 * A function to draw bar chart.
 */
function drawBarChart(d3, data) {

  let margin = {
    top: 20,
    bottom: 20,
    right: 20,
    left: 20
  };
  let height = 300 - margin.left - margin.right;
  let width = 600 - margin.top - margin.bottom;

  let container = d3.select('.vivaGraph')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .attr('viewBox', '0 0 ' + (margin.left+ margin.right+ width) + ' ' + (margin.top + margin.bottom + height ));

  // create scale functions
  let xScale = d3.scale.ordinal()
    .rangeRoundBands([margin.left, width], .1)
    .domain(data.map(function(d) {
      return d.color;
    }));

  let yScale = d3.scale.linear()
    .rangeRound([height, 0])
    .domain([0, d3.max(data, function(d) {
      return d.strength;
    })]);

  let xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");
      // .tickFormat(d3.time.format("%Y-%m"));

  let yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");
      // .ticks(10);

  container.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate("+0 +"," + (height ) + ")")
     .call(xAxis)
   .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("dy", "-.55em")
     .attr("transform", "rotate(-90)" );

  container.append("g")
     .attr("class", "y axis")
     .attr('transform', 'translate('+margin.left+','+0+')')
     .call(yAxis)
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("strength");

  container.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return xScale(d.color); })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.strength); })
      .attr("height", function(d) { return  height - yScale(d.strength); });
}


module.exports = drawBarChart;
