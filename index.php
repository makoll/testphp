<?php

echo 'test¥n';
echo 'test¥n';

print_r ($_SERVER);
echo $_SERVER['SERVER_ADDR'];

echo isNullBlank(null);
echo isNullBlank('test');
print 'test5';

function isNullBlank($str) {

  return (is_null($str) || $str == '');
}
?>
