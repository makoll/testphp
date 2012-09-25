<?php

echo 'test¥n';
echo 'test¥n';


echo isNullBlank(null);
echo isNullBlank('test');
echo 'test5';

function isNullBlank($str) {

  return (is_null($str) || $str == '');
}
?>
