<?php
mb_regex_encoding('UTF8');

$str = 'あ今日の授業はaa英語居酒屋ですaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
$match = '英語';
$match_re = '/(.{0,100})(英語)(.{0,100})/u';


$a = mb_ereg_search_init($str, $match);
// $a = mb_ereg_search_init('abcdef', 'cd');
$b = mb_ereg_search_pos();
print_r($b);

preg_match($match_re, $str, $regex);
print_r($regex)
?>
