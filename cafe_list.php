<?php
// cafeリストを取得

$foursquare_access_token = '3C5YMJ00BBGFF0DBCKLPDYTRLZUYREUVTP0CMKI0GF20GCTK';

if(!$foursquare_access_token) {

  if(isset($_REQUEST['code'])) {
    $access_token_url = FOURSQUARE_ACCESS_TOKEN_URL
      . "?client_id="     . FOURSQUARE_CLIENT_ID
      . "&client_secret=" . FOURSQUARE_SECRET
      . "&grant_type=authorization_code"
      . "&redirect_uri="  . urlencode(FOURSQUARE_CALLBACK)
      . "&code="          . $_REQUEST['code'];

    $callback_data            = file_get_contents($access_token_url);
    $data                     = json_decode($callback_data, true);
    $foursquare_access_token  = $data['access_token'];

  } else {
    echo "<script type='text/javascript'>window.close();</script>";
    echo "No access token";
    exit();
  }
}

$ll = '35.6592,139.7013';

//$foursquare_api = "https://api.foursquare.com/v2/venues/search"
//  . "?oauth_token=" . $foursquare_access_token
//  . "&ll=" . $ll
//  . "&limit=500";

//$json = file_get_contents($foursquare_api);
//$data = json_decode($json, true);

//$datas = $data['response']['groups'][0]['items'];

//$cafePoint = '';

//foreach($datas as $item) {
//  $genre = $item['categories'][0]['name'];
//   echo $genre.'<br>';
//  if($genre == 'Coffee Shop' || $genre == 'Café') {
//    $cafePoint .= $item['name'].','.$item['location']['lat'].','.$item['location']['lng'].'_';
//  }
//}
//$cafePoint = substr($cafePoint, 0, -1);

$cafePoint = 'ドトールコーヒーショップ 渋谷1丁目店,35.6601707507,139.702521265_FOOD &amp; CAFE 渋谷店,35.6590920071,139.701150656_cafe SIPHON,35.6593115708,139.701221064_星乃珈琲 109 MEN’S店,35.6597632271,139.700893164_SCRAMBLE Cafe &amp; Bar,35.6596128569,139.701162726';

?>
