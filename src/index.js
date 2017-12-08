let d3 = require('d3')

let data = require('./data');

let drawBarChart = require('./charts/bar-chart');
let drawScatterChart = require('./charts/scatter-chart');

drawBarChart(d3, data)
drawScatterChart(d3, data)
