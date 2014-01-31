/**
 * Copyright 2013-2013, tritrue Inc. All rights reserved.
 * http://codezine.jp/article/detail/7459
 *
 * @fileoverview
 */
$(function() {
  initialElement();

  /**
   * 各要素を初期化
   */
  function initialElement() {
    // 1
    d3.select('.test').style('color', 'red');

    // 2
    var fruits = ["Apple", "Orange", "Banana"];
    d3.select("#fruits").selectAll("p").data(fruits).text(function(d) {return d;});

    // 3
    var fruits = ["Apple", "Orange", "Banana", "Strawberry"];
    d3.select("#fruits2").selectAll("p")
      .data(fruits).text(function(d) {return d;})
      .enter().append('p').text(function(d) {return d;});

    // 4
    var fruits = ["Apple", "Orange", "Banana"];
    d3.select("#fruits3").selectAll("p")
      .data(fruits).text(function(d) {return d;})
      .exit().remove();

    // 5
    var svg = d3.select("#circle_parent").append("svg").attr("width",700).attr("height",400);
    svg.append("circle")
      .attr("cx",300)
      .attr("cy",200)
      .attr("r",180)
      .attr("fill","#28cca3") // 塗りつぶしの色
      .attr("stroke","#2efac7") // 枠の色
      .attr("stroke-width",10); // 枠の太さ
  }
});
