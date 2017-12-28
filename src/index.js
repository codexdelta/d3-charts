let d3 = require('d3');
let fs = require('fs');
let nvd3 = require('nvd3');
let fastDom = require('fastdom');
let adChart = {}
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

let window = dom.window
  window.d3 = d3.select(window.document);
let svg = window.d3.select('body')
          .append('svg')
          .attr('width', 100)
          .attr('height', 100)
          .attr('xmlns', 'http://www.w3.org/2000/svg');
let data = [{
  x: 10,
  y: 20
},{
  x: 20,
  y: 30
}];

svg.selectAll('g')
.data(data)
.enter()
.append('g')
.attr('class', 'viva g club');
// svg.append('rect')
//   .attr('x', 10)
//   .attr('y', 10)
//   .attr('width', 80)
//   .attr('height', 80)
//   .style('fill', 'orange');




fs.writeFileSync('out.svg', window.d3.select('svg').node().outerHTML); // or this

// console.log(nvd3);
module.exports = adChart
