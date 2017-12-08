
/**
 * A function to draw bar chart.
 */
function drawBarChart(d3, data) {

  let height = 350;
  let width = 700;
  let margin = {
    top: 20,
    bottom: 20,
    right: 20,
    left: 20
  };

  let container = d3.select('.vivaGraph')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .attr('viewBox', '0 0 ' + width + ' ' + height);



  // create scale functions
  let xScale = d3.scaleBand()
    .rangeRound([0, width - margin.left - margin.right])
    .padding(0.1)
    .domain(data.map(function(d) {
      return d.id;
    }));

  let yScale = d3.scaleLinear()
    .rangeRound([height - margin.top - margin.bottom, 0])
    .domain([0, d3.max(data, function(d) {
      return d.y;
    })]);


  let g = container.append('g');

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
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

  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) {
      return xScale(d.id)
    })
    .attr('y', function(d) {
      // console.log(d);
      // debugger
      return yScale(d.y)
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function(d) {
      return (height - margin.top - margin.bottom) - yScale(d.y)
    });
}


module.exports = drawBarChart;
