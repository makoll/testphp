<?php
//検索
?>
<?php
  //カフェ検索
  require_once('./constants.php');
  require_once('./cafe_list.php');
?>

<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<title>search</title>
<link href='css/jquery-ui-1.8.17.custom.css' rel='stylesheet' />
<!-- <link href='css/cafe_search.css' rel='stylesheet' /> -->
<script src='./js/jquery-1.7.1.min.js'></script>
<script src='./js/jquery-ui-1.8.17.custom.min.js'></script>
<!-- <script src='./js/cafe_search.js'></script> -->
</head>
<body>

<input id='location' type='text'></input>
<input id='word' type='text'></input>
<input id='submit' type='button'></input>

</body>
</html>
