<?php
$dir = '/Users/makoll/Downloads/log/searcher/cache/';
$time = 360;
if ($handle = opendir($dir)) {

  $now = time();
  echo $now . PHP_EOL;
  /* ディレクトリをループする際の正しい方法です */
  while (false !== ($file = readdir($handle))) {
    if($file == '.' || $file == '..') {
      continue;
    }
    echo $file . '   :   ' . filemtime($dir . $file) . '   :   ' . ($now - filemtime($dir . $file)) . PHP_EOL;
    if($time < $now - filemtime($dir . $file)) {
//       unlink($dir . $file);
//       echo 'remove';
    }
  }

  closedir($handle);
}
?>
