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
    var w = 1024;
    var h = 768;

    // 円の半径
    var radiuses = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
    // 円に設定する色
    var colors = ["#bdc3c7", "#f39c12", "#2ecc71", "#e74c3c",
                  "#2c3e50", "#3498db", "#8e44ad", "#e67e22",
                  "#1abc9c", "#f1c40f", "#2980b9", "#c0392b"];

    var svg = d3.select("body").append("svg")
      .attr("width", w).attr("height", h);

    svg.selectAll("circle")
      .data(radiuses)
      .enter()
      .append("circle")
      // ランダムな位置に生成
      .attr("cx", function(d) { return Math.random() * w; })
      .attr("cy", function(d) { return Math.random() * h; })
      .attr("fill", function(d, i) { return colors[i]; })
      // 徐々に大きくなるように半径0を初期値として設定
      .attr("r", 0)
      .transition()
      // それぞれの円を時間差で生成させるための遅延の設定
      .delay(function(d, i) { return i * 200; })
      .duration(700)
      .ease("bounce")
      // 最終的に表示される円の半径
      .attr("r", function(d) { return d; });
  }
});
