<?php

echo 'test¥n';

echo isNullBlank(null);
echo isNullBlank('test');

function isNullBlank($str) {

  return (is_null($str) || $str == '');
}

?>
