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
    // 描画領域の設定
    var margin = {top: 20, right: 40, bottom: 30, left: 40},
        width = 1080 - margin.left - margin.right,
        height = 768 - margin.top - margin.bottom;

    // X軸、Y軸の表示比率
    var x = d3.scale.ordinal().rangeRoundBands([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // 円に設定する色のカテゴリ
    var color = d3.scale.category10();

    // X軸
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom"); // 下に配置

    // Y軸
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left"); // 左に配置

    // ツールチップ生成
    var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0); // 初期値は透明

    // SVG要素生成
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 // CSV読込
    d3.csv("two-rowed_barley.csv", function(error, data) {

      // 文字列を数値に変換
      data.forEach(function(d) {
        d["収穫量(t)"] = +d["収穫量(t)"];
        d["作付面積(ha)"] = +d["作付面積(ha)"];
      });

      // 表示領域の設定
      x.domain(data.map(function(d) { return d["都道府県"]; }));
      y.domain(d3.extent(data, function(d) { return d["収穫量(t)"]; })).nice();

      // X軸ラベルの追加
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width + 30)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("都道府県");

      // Y軸ラベルの追加
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("収穫量(t)");
      // 都道府県別の二条大麦収穫量、作付面積を表す円を作成
      svg.selectAll(".circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "circle")
        .attr("r", function(d) { return d["作付面積(ha)"] / 120;} )
        .attr("cx", function(d) { return x(d["都道府県"]) + 23; })
        .attr("cy", function(d) { return y(d["収穫量(t)"]); })
        .attr("fill", function(d) { return color(d["都道府県"]); })
        .on("mouseover", function(d){
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip
            .style("top", (d3.event.pageY-10)+"px")
            .style("left",(d3.event.pageX+10)+"px")
            .html("都道府県：" + d["都道府県"] + "</br>"
              + "収穫量：" + d["収穫量(t)"] + "(t)</br>"
              + "作付面積：" + d["作付面積(ha)"] + "(ha)</br>");
        })
          .on("mouseout", function(){
            tooltip.transition()
              .duration(400)
              .style("opacity", 0);
          });

      var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    });
  }
});
