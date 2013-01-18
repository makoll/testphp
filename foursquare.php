<?php
// foursquareに接続する

require_once('constants.php');

try {
  $oauth_url =
    FOURSQUARE_AUTH_URL
    . "?client_id=" . FOURSQUARE_CLIENT_ID
    . "&response_type=code"
    . "&redirect_uri=" . urlencode(FOURSQUARE_CALLBACK);

  header("Location: $oauth_url");
} catch (Exception $e) {
  echo $e->getMessage();
}

?>
