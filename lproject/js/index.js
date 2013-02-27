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

$(function () {

//対象となる要素を変数に格納しておく
var $slider     = $('#slider'),
   $container  = $slider.find('div.slider-container'),
   $containerDiv = $slider.find('div.slider-container div');
var distance = 0;    //移動距離を指定するのに使う

//スライド関数
var slide = {

 // スライド(進む)
 next: function (index, spd, flick_flg) {
   distance = distance + index;
   slide.scroll(distance, spd, flick_flg);
 },

 // スライド(戻る)
 prev: function (index, spd, flick_flg) {
   distance = distance - index;
   slide.scroll(distance, spd, flick_flg);
 },

 //移動距離分スクロール
 scroll : function (d, spd, flick_flg) {
   var move = -d
   var env = 'translate3d(' + move + 'px,0,0)';

   if (flick_flg) {
     /* フリック時はwebkit-transformプロパティを設定し、滑らかなアニメーションにする */
     transit_property = '-webkit-transform ' + spd + 'ms cubic-bezier(0,0,0.25,1)';
   } else {
     transit_property = 'none';
   }

   $container.css({
     '-webkit-transform':env,
     '-webkit-transition':transit_property
   }).bind('webkitTransitionEnd', function(){
      //ここで移動後の終了イベントが取れます
   });
 }
}

$(window).load(function() {
 var pageX;      //リアルタイムのX座標
 var pageY;      //リアルタイムのY座標
 var startPageX; //スタート時のX 座標の位置
 var startTime;  //スタート時の時間
 var move_time = 0;

 /* タッチの開始時のイベント */
 $('#slider').bind('touchstart', function() {
   event.preventDefault();     // ページが動いたり、反応を止める（A タグなど）
   pageX = event.changedTouches[0].pageX;
   pageY = event.changedTouches[0].pageY;
   startPageX = pageX;
   startTime = +new Date();
 });

 /* タッチしたまま動かしたときのイベント */
 $('#slider').bind('touchmove', function() {
   var moveX = event.changedTouches[0].pageX; // X 座標の位置
   var absX = Math.abs(pageX - moveX); // 移動距離の絶対値
   var spd = 0.5;
   pageY = event.changedTouches[0].pageY;

   /* スワイプ処理 */
     if (pageX > moveX) {
       slide.next(absX, spd);
     } else if (pageX < moveX) {
       slide.prev(absX, spd);
     }
     pageX = moveX;
 });

 /* タッチ状態から離れたときのイベント */
 $('#slider').bind('touchend', function() {
   /* 終了処理が必要ならここに書く */
   /* このイベントは、位置を取得できないので注意 */

   var diffX = startPageX - pageX;
   var absX = Math.abs(diffX);
   var mv = 200; //フリック移動距離
   var spd = 700; //フリックスピード
   var now = +new Date(); //現在時間
   var diffTime = now - startTime; //touchstartからの経過時間

   /* フリック処理(touchstartからの経過時間が短い場合) */
   if (diffTime < 400) {
     if (diffX > 0) {
       slide.next(mv, spd, true);
     } else if (diffX < 0) {
       slide.prev(mv, spd, true);
     }
   }

   move_time = 0;
 });
});
});
