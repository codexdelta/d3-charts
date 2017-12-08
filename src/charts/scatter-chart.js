
/**
 * A function to draw bar chart.
 */
function drawScatterChart(d3, data) {

  let height = 350;
  let width = 700;
  let margin = {
    top: 20,
    bottom: 20,
    right: 20,
    left: 20
  };

  let container = d3.select('.scatterGraph')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .attr('viewBox', '0 0 ' + width + ' ' + height);



  // create scale functions
  let xScale = d3.scaleLinear()
    .rangeRound([margin.left, width - margin.left - margin.right])
    .domain([d3.min(data, function(d){return d.x;}), d3.max(data, function (d) { return d.x; })]);

  let yScale = d3.scaleLinear()
    .rangeRound([height - margin.top - margin.bottom, 0])
    .domain([d3.min(data, function(d){return d.y;}), d3.max(data, function(d) {
      return d.y;
    })]);

  // to give any dynamic vlaue to set the radius of circle
  let rScale = function(){
    return 3;
  }

  let g = container.append('g');

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", 'translate('+ 0 +', ' + (height - margin.top - margin.bottom) + ')')
      .call(d3.axisBottom(xScale));

  g.append("g")
      .attr("class", "axis axis--y")
      .attr('transform', 'translate('+ margin.left +', 0)')
      .call(d3.axisLeft(yScale))
    // .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr('transform', 'translate('+ margin.left + margin.right+', 0)')
    //   .attr("y", 6)
    //   .attr("dy", "0.71em")
    //   .attr("text-anchor", "end")
    //   .text("Frequency");

  g.selectAll('.circle')
    .data(data)
    .enter().append('circle')
    .attr('class', 'circle')
    .attr('cx', function(d) {
      return xScale(d.x)
    })
    .attr('cy', function(d) {
      return yScale(d.y)
    })
    .attr('r', function(d){
      return rScale();
    });
}


module.exports = drawScatterChart;
