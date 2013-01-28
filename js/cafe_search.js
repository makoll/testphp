$(function() {

  var mapZoom = 11;

  var key = '&key=37nQyzCUnAVzALnglTBWnA6f9QmgwP44atre6mbcQyHZZdpvTzrxJzTqrxdzTIpRe8JcoR0LFtpRuzTJ';
  var densityMapSrc = 'http://aplia.its-mo.com/v1_0/density_latest/H/3600/image/point?latlon=__lat__,__lon__&maplvl=14&wh=500,600&enc=UTF8&pflg=1&datum=WGS84';
  densityMapSrc += key;

//  var densityValueSrc = 'http://aplia.its-mo.com/v1_0/density_latest/H/3600/bounds?key=xxxxx&llbounds=35.6481875,139.7106767,35.7072017,139.7994633&meshlvl=5&pos=1&cnt=100&enc=UTF8&pflg=1&datum=WGS84&outf=JSO
//    bounds?latlon=__lat__,__lon__&maplvl=14&wh=500,600&enc=UTF8&pflg=1&datum=WGS84';
//  densityValueSrc += key;


  $(window).bind('load', main);

  function main() {

    if (!navigator.geolocation) {
      console.log("本ブラウザではGeolocationが使えません");
      return
    }

    // 現在の位置情報を取得
    navigator.geolocation.getCurrentPosition(
      function(pos) { drawMap(pos); },
      // （2）位置情報の取得に失敗した場合
      function(error) {
        var message = "";

        switch (error.code) {

          // 位置情報が取得できない場合
          case error.POSITION_UNAVAILABLE:
            message = "位置情報の取得ができませんでした。";
            break;

          // Geolocationの使用が許可されない場合
          case error.PERMISSION_DENIED:
            message = "位置情報取得の使用許可がされませんでした。";
            break;

          // タイムアウトした場合
          case error.PERMISSION_DENIED_TIMEOUT:
            message = "位置情報取得中にタイムアウトしました。";
            break;
        }
        window.alert(message);
      }
    );
  }

  function drawMap(pos) {

    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    lat = '35.6592';
    lon = '139.7013';

    $('#density_map').attr('src', densityMapSrc.replace(/__lat__/, lat).replace(/__lon__/, lon));

    var latlon = new ZDC.LatLon(lat, lon);

    var map = new ZDC.Map(
      document.getElementById('map_body'),
      {
        'latlon' : latlon,
        'zoom' : mapZoom
      }
    );

    var cafePoints = $('#cafe_point').text().split('_');

    for(var i = 0; i < cafePoints.length; i++) {

      var eachCafePoint = cafePoints[i].split(',');
      var eachLatlon = new ZDC.LatLon(eachCafePoint[1], eachCafePoint[2]);

      /* マーカを作成 */
      var mrk = new ZDC.Marker(eachLatlon,{
        'number' : eval('ZDC.MARKER_NUMBER_ID_' + (i + 1) +'_S')
    });

      /* マーカを追加 */
      map.addWidget(mrk);
    }
  }
});
