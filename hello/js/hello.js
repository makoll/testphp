/**
 * Copyright 2013-2013, tritrue Inc. All rights reserved.
 *
 * @fileoverview
 */
$(function() {
  initialElement();

  /**
   * 各要素を初期化
   */
  function initialElement() {
    // Geolocation APIを利用できない環境の場合
    if(!navigator.geolocation) {
      return;
    }

    // 現在の位置情報を取得
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        new google.maps.Geocoder().geocode({
//          'latLng' : new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
          'latLng' : new google.maps.LatLng(33, 139)
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK && results[0].geometry) {
            var address = results[0].formatted_address.replace(/^日本, /, '').replace(/〒[0-9]{3}[\-]?[0-9]{4}/, '').trim();
            $('#address').text(address);
          }
        });
    });
  }
});
