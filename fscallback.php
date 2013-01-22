<?php
// foursquareからのコールバック

require_once('constants.php');

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

$foursquare_api = "https://api.foursquare.com/v2/users/self/checkins"
  . "?oauth_token=" . $foursquare_access_token
  . "&limit=". FOURSQUARE_GET_INIT_LIMIT;

$json = file_get_contents($foursquare_api);

$data = json_decode($json, true);

$column = array(
  "id",
  "createdAt",
  "type",
  "shout",
  "timeZone",
  "timeZoneOffset",
  "venue_id",
  "photos_count",
  "comments_count",
  "source_name",
  "source_url",
  "userId");

/* Foursquare情報取得 */
foreach($data["response"]["checkins"]["items"] as $key=>$value) {

  /* チェックイン情報登録 */
  $eachData = array(
    $value["id"],
    $value["createdAt"],
    $value["type"],
    $value["shout"],
    $value["timeZone"],
    $value["timeZoneOffset"],
    $value["venue"]["id"],
    $value["photos"]["count"],
    $value["comments"]["count"],
    $value["source"]["name"],
    $value["source"]["url"],
    $userId);

  print_r($eachData);
  /* 写真情報登録 */
//   foreach($value["photos"]["items"] as $p_key=>$p_value) {
//     $result = $db->get_search_result_array("foursquare_photo", "id", "id=?",
//                                            array($p_value["id"]));
//     if(empty($result)) {
//       /* 空項目に対するワーニング対応 */
//       if(!isset($p_value["user"]["canonicalUrl"]))
//         $p_value["user"]["canonicalUrl"] = "";

//       $db->insert_record("foursquare_photo",
//                          array("id",                "createdAt",
//                                "url",               "sizes_count",
//                                "source_name",       "source_url",
//                                "user_id",           "user_firstName",
//                                "user_lastName",     "user_photo",
//                                "user_gender",       "user_homeCity",
//                                "user_canonicalUrl", "user_relationship",
//                                "visibility"),
//                          array($p_value["id"],
//                                $p_value["createdAt"],
//                                $p_value["url"],
//                                $p_value["sizes"]["count"],
//                                $p_value["source"]["name"],
//                                $p_value["source"]["url"],
//                                $p_value["user"]["id"],
//                                $p_value["user"]["firstName"],
//                                $p_value["user"]["lastName"],
//                                $p_value["user"]["photo"],
//                                $p_value["user"]["gender"],
//                                $p_value["user"]["homeCity"],
//                                $p_value["user"]["canonicalUrl"],
//                                $p_value["user"]["relationship"],
//                                $p_value["visibility"]));
//       /* チェックインと写真情報の紐付け */
//       $db->insert_record("foursquare_photo_info", array("photo_id", "checkin_id"),
//                          array($p_value["id"], $value["id"]));
//     }
//   }/* foreach - 写真情報登録 */

} /* foreach - Foursquare情報取得 */

?>
