/**
 * Copyright 2013-2013, tritrue Inc. All rights reserved.
 *
 * @fileoverview ※
 */
$(function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  d3.tsv("test.csv", function(error, data) {
    data.forEach(function(d) {
      d.date = d3.time.format("%Y%m%d%H").parse(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    d3.select("#x").call(xAxis);
    d3.select("#y").call(yAxis);
    d3.select("#line")
    .datum(data)
    .attr("d", line);
  });
});
