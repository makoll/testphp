<?php

echo 'test¥n';
echo 'test¥n';


echo isNullBlank(null);
echo isNullBlank('test');
print 'test5';

function isNullBlank($str) {

  return (is_null($str) || $str == '');
}
?>
