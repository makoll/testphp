<?php

// 固定値を保持するファイル

$serverIp = $_SERVER['SERVER_ADDR'];

if($serverIp == '10.61.255.126') {

  $domainName = 'http://54.249.57.50/~guest16/';
  define('FOURSQUARE_CLIENT_ID',       'MZN1WWCLLVCVIOYXL3QXIPBXDFRRRGAIYICY5UUJPIWSH0P2');
  define('FOURSQUARE_SECRET',          'U5IJALALY1UGBJTF1F0CHTNAKGOHYURH55MX4TGJ5A2MRKEV');
  define('FOURSQUARE_CALLBACK',        $domainName.'fscallback.php');
} else if($serverIp == '10.61.255.126') {

  $domainName = 'http://testphp-hirose.herokuapp.com/';
  define('FOURSQUARE_CLIENT_ID',       'GCA1UL2TDORRWZBXRSW5DQAKZD2WB3S21UCQGKM4CSBBLXGD');
  define('FOURSQUARE_SECRET',          'SBLVYEGMJAAJQEQAUUO01OYMQAUZFTEKDH5JWDV1B3GRZXYV');
  define('FOURSQUARE_CALLBACK',        $domainName.'fscallback.php');
} else {

  $domainName = 'http://testphp.mba-2.local/';
  define('FOURSQUARE_CLIENT_ID',       'NILU2RCKKD3ZYCBWT0BAFDPFLQ4Y5KVIQFUYELTEJJ2U0QP3');
  define('FOURSQUARE_SECRET',          '5VTZZIP4FEXQZAKTVH35QL0GHPWRC41YMJLDDZAL5T1EE3U2');
  define('FOURSQUARE_CALLBACK',        $domainName.'settings/fscallback.php');
}

define('FOURSQUARE_AUTH_URL',        'https://ja.foursquare.com/oauth2/authorize');
define('FOURSQUARE_ACCESS_TOKEN_URL','https://ja.foursquare.com/oauth2/access_token');

define('FOURSQUARE_GET_INIT_LIMIT','9999');
?>
