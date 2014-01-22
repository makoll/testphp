<?php
$return_array = array(
  0 => 0,
  1 => 0,
  2 => 0
);

// $year_month = get_posted_value('year_month');
$year_month = '2013-11';

$file_name = "./data/result/$year_month.csv";
if(file_exists($file_name)) {
  return;
}

get_library_data($year_month);
get_library_title($year_month);
analysis_library_title($year_month);

$fno = fopen($file_name, 'w+');
fwrite($fno, 'sts,count' . PHP_EOL);
fwrite($fno, 'ポジ,' . $return_array[1] . PHP_EOL);
fwrite($fno, 'ネガ,' . $return_array[2] . PHP_EOL);
fwrite($fno, '他,' . $return_array[0] . PHP_EOL);
fclose($fno);

function get_library_data($year_month) {
  $file_name = "./data/library/xml/$year_month.xml";
  if(file_exists($file_name)) {
    return;
  }
  $year = substr($year_month, 0, 4);
  $month = substr($year_month, 5, 2);
  $last_day = date("t", mktime(0, 0, 0, $month, 1, $year));

  $creator = mb_convert_encoding("","UTF-8","auto");
  $url = "http://iss.ndl.go.jp/api/sru?operation=searchRetrieve&recordPacking=xml&maximumRecords=5&query=from=%22" . "$year_month-01" . "%22%20and%20until=%22". "$year_month-$last_day" ."%22";
  $xml = file_get_contents($url);

  file_put_contents($file_name, $xml);
}

function get_library_title($year_month) {
  $file_name = "./data/library/csv/$year_month.csv";
  if(file_exists($file_name)) {
    return;
  }

  $xml = simplexml_load_file("./data/library/xml/$year_month.xml");
  //使用している名前空間を取得します。
  $nameSpaces = $xml->getNamespaces(true);
  $record = $xml->records->record;
  $fno = fopen($file_name, 'w+');

  foreach($record as $e_record) {
    $record_data = $e_record->recordData;
    //名前空間「g」のノードを取得
    $srw_dc = $record_data->children($nameSpaces['srw_dc']);
    $dc = $srw_dc->children($nameSpaces['dc']);
    $title = $dc->title;
    fwrite($fno, $title . PHP_EOL);
  }

  fclose($fno);
}

function analysis_library_title($year_month) {
  $fp = fopen("./data/library/csv/$year_month.csv", 'r');

  // 全行の文字列を読み込みます。
  while(feof($fp) == false) {
    $title = fgets($fp);
    if($title != '') {
      echo get_xing_data($title);
    }
  }

  // ファイルをクローズします。
  fclose($fp);
}

function get_xing_data($sent) {
  $param = array('sent' => urlencode($sent),'mode' => '');
  $param = http_build_query($param,"","&");

  $headers = array("User-Agent: php","Authorization: Basic ".base64_encode('team04:souryu'),"Content-Type: application/x-www-form-urlencoded","Content-Length: ".strlen($param));
  $context = array(
    "http" => array(
      "method" => "POST",
      "header" => implode("\r\n",$headers),
      "content" => $param
  )
  );
  $context = stream_context_create($context);

  $url = "http://202.222.86.89/hackathon/webapi/analysis/";
  $contents = file_get_contents($url,false,$context);
  $json = json_decode($contents);

  if(JSON_ERROR_NONE !== json_last_error()){
    //   error_output("システム的にエラーでした？");
    exit(0);
  }

  if($json->error_code != '0'){
    //   error_output("解析を始めようとしてエラーでした？");
    exit(0);
  }

  if(empty($json->result)){
    //   error_output("結果が空っぽでした？");
    exit(0);
  }

  return count_pn($json->result);
}

function count_pn($result) {
  $pn = 0;
  foreach($result as $s) {
    if($s->ana_error_code != '0'){
      continue;
    }
    $a = $GLOBALS['return_array'][$s->sent_pn];
    $GLOBALS['return_array'][$s->sent_pn] = $GLOBALS['return_array'][$s->sent_pn]+1;
  }
}

?>
