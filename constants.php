<?php

// 固定値を保持するファイル
// $domainName = getenv('DOMAIN_NAME');
$domainName = 'http://testphp.mba-2.local/';
// define('FOURSQUARE_CLIENT_ID',       getenv('FOURSQUARE_CLIENT_ID'));
define('FOURSQUARE_CLIENT_ID',       'NILU2RCKKD3ZYCBWT0BAFDPFLQ4Y5KVIQFUYELTEJJ2U0QP3');
// define('FOURSQUARE_SECRET',          getenv('FOURSQUARE_SECRET'));
define('FOURSQUARE_SECRET',          '5VTZZIP4FEXQZAKTVH35QL0GHPWRC41YMJLDDZAL5T1EE3U2');
// define('FOURSQUARE_CALLBACK',        $domainName.'settings/fscallback.php');
define('FOURSQUARE_CALLBACK',        $domainName.'fscallback.php');
define('FOURSQUARE_AUTH_URL',        'https://ja.foursquare.com/oauth2/authorize');
define('FOURSQUARE_ACCESS_TOKEN_URL','https://ja.foursquare.com/oauth2/access_token');

define('FOURSQUARE_GET_INIT_LIMIT','9999');
?>
