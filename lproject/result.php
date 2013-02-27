<?php
/**
 * Copyright 2013-2013, tritrue Inc. All rights reserved.
 *
 * @fileoverview 検索トップ
 */
?>
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<title>l project</title>
<link href='./css/index.css?<?= $last_release_time ?>' rel='stylesheet' />
<link href='./css/jquery-ui-1.10.0.custom.min.css' rel='stylesheet' />
<script src='./js/jquery-1.9.1.js'></script>
<script src='./js/jquery-ui-1.10.0.custom.js'></script>
<script src='./js/common.js?<?= $last_release_time ?>'></script>
<script src='./js/index.js?<?= $last_release_time ?>'></script>
</head>
<body>
  <div id='result'>
    <div id='count'>30 places</div>
    <div class='place'>
      <a class='place_url' href='http://www.hotpepper.jp/strJ001010100/'>花しぐれ 大崎店/グルメ・クーポンのホットペッパー</a>
      <div class='place_body'>
        <img class='place_thumbnail' src='https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDIrWE_QzRukQTL&url=http%3A%2F%2Fimgfp.hotp.jp%2FIMGH%2F01%2F73%2FP016140173%2FP016140173_480.jpg' />
        <span class='place_caption'>大崎駅から徒歩３０秒！<br>☆昼宴会受付けてます☆2次会コースもご用意♪ bar<br>【土日祝日限定】宴会コース1980円から</span>
      </div>
      <div class='place_fotter'>
        <span class='place_adress'>東京都品川区大崎3-6-17 ニュー大崎ビル2F</span>
      </div>
    </div>
    <div class='place'>
      <a class='place_url' href='http://www.hotpepper.jp/strJ001010100/'>花しぐれ 大崎店/グルメ・クーポンのホットペッパー</a>
      <div class='place_body'>
        <img class='place_thumbnail' src='https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDIrWE_QzRukQTL&url=http%3A%2F%2Fimgfp.hotp.jp%2FIMGH%2F01%2F73%2FP016140173%2FP016140173_480.jpg' />
        <span class='place_caption'>大崎駅から徒歩３０秒！<br>☆昼宴会受付けてます☆2次会コースもご用意♪ bar<br>【土日祝日限定】宴会コース1980円から</span>
      </div>
      <div class='place_fotter'>
        <span class='place_adress'>東京都品川区大崎3-6-17 ニュー大崎ビル2F</span>
      </div>
    </div>
  </div>
  <div id='footer' class='info_window'>
    <img id='footer_logo_image' src='./img/logo.png' >
    <input type='text' id='search_word' value='居酒屋' >
    <div id='search_button' >
      <img id='loope' src='./img/loope.png' >
    </div>
  </div>

</body>
</head>
