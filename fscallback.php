<?php
// foursquareからのコールバック

require_once('constants.php');

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

?>
