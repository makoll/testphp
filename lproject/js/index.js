/**
 * Copyright 2013-2013, tritrue Inc. All rights reserved.
 *
 * @fileoverview l__メイン用javascript
 */
$(function() {

  main();

  /**
   * main処理
   */
  function main() {
    initialElement();
    initialBind();
    initialLocation();
  }

  /**
   * 各要素を初期化
   */
  function initialElement() {
  }

  /**
   * 各要素にイベントをバインド
   */
  function initialBind() {
    // 検索処理
    $(document)
      .on('click', '#search_button', search)
      .on('keypress', '#search_word', function(e) {
        if((e.which == 13)) {
          search($(this).attr('value'));
          return false;
        }
      }
    );
  }

  function search() {
    $.l__.doParallelAjaxAction(
      $.l__.emptyFunction,
      {
        'script_type' : 'search',
        'search_word' : $('#search_word').val(),
        'lat' : $.l__.lat,
        'lng' : $.l__.lng,
        'max_distance' : $('input[name="max_distance"]:checked').attr('id')
      },
      function(return_value) {
        $('#search_result').html(return_value);
      }
    );
  }

  /**
   * 位置情報を初期化
   */
  function initialLocation() {

    if (!navigator.geolocation) {
      console.log('本ブラウザではGeolocationが使えません');
      return
    }

    // 現在の位置情報を取得
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        $.l__.lat = pos.coords.latitude;
        $.l__.lng = pos.coords.longitude;
      },
      // （2）位置情報の取得に失敗した場合
      function(error) {
        var message = '';

        switch (error.code) {

          // 位置情報が取得できない場合
          case error.POSITION_UNAVAILABLE:
            message = '位置情報の取得ができませんでした。';
            break;

          // Geolocationの使用が許可されない場合
          case error.PERMISSION_DENIED:
            message = '位置情報取得の使用許可がされませんでした。';
            break;

          // タイムアウトした場合
          case error.PERMISSION_DENIED_TIMEOUT:
            message = '位置情報取得中にタイムアウトしました。';
            break;
        }
        //TODO
        window.alert(message);
      }
    );
  }
});
