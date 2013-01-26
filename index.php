<?php

echo 'test\n';
echo 'test\n';

if($_SERVER) {
  echo 1;
} else {
  echo 2;
}

print_r($_SERVER);
echo $_SERVER['SERVER_ADDR'];

echo isNullBlank(null);
echo isNullBlank('test');
print 'test5';

function isNullBlank($str) {

  return (is_null($str) || $str == '');
}
?>
