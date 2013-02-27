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
<title>l project</title>
<link href='./css/index.css?<?= $last_release_time ?>' rel='stylesheet' />
<link href='./css/jquery-ui-1.10.0.custom.min.css' rel='stylesheet' />
<script src='./js/jquery-1.9.1.js'></script >
<script src='./js/jquery-ui-1.10.0.custom.js'></script>
<script src='./js/common.js?<?= $last_release_time ?>'></script>
<script src='./js/index.js?<?= $last_release_time ?>'></script>
</head>
<body>
<div id='content' >
  <div id='logo'>
    <img id='logo_image' src='./img/logo.png' >
    <div id='logo_caption'>local search</div>
  </div>
  <div id='search'>
    <input type='text' id='search_word' value='居酒屋' >
    <div id='search_button' >
      <img id='loope' src='./img/loope.png' >
    </div>
  </div>
  <a id='company_url'href='http://www.tritrue.com'>tritrue.com</a>
</div>
</body>
</head>
