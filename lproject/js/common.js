/**
 * Copyright 2013-2013, tritrue Inc. All rights reserved.
 *
 * @fileoverview 共通jquery拡張
 */
/**
 * 全角スペースを置換可能とする。
 * @return {string} 置換後の文字列
 */
String.prototype.trim = function() {
  return this.replace(/^[\s　]+|[\s　]+$/g, '');
};

/**
 * HTMLエスケープを行う。
 * @return {string} エスケープ後の文字列
 */
String.prototype.escapeHtml = function() {
  var map = {"<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&#39;", "\"":"&quot;", " ":"&nbsp;", "\n":"<br>"};
  return this.replace(/<|>|&|'|"|\s|\n/g, function(s){ return map[s]; });
};

$(function() {

  $.l__ = new Object();

  $.l__.URL_REGEX = /(https*:\/\/[a-zA-Z0-9_\/\?\.#]+)/g;

  $.l__.buttonEnterLock = new Object();
  $.l__.LOCK = 1;
  $.l__.CREATE_DIV_NO_ESCAPE = 1;

  $.l__.emptyFunction = function() {
    //do nothing
  };

  // 使用ブラウザ情報を保持する変数。
  $.isChrome = false;
  $.isFirefox = false;
  $.isOpera = false;
  $.isSafari = false;
  $.isUnderIe7 = false;
  $.isIe8 = false;
  $.isIe9 = false;
  $.isTargetBrowser = false;
  distinguishBrowser();

  /**
   * 使用しているブラウザを判別する。
   */
  function distinguishBrowser() {

    if(!$.support.checkOn) {
      $.isChrome = true;
      $.isSafari = true;
    } else if($.support.noCloneEvent) {
      if(window.globalStorage) {
        $.isFirefox = true;
      } else if(window.opera){
        $.isOpera = true;
      } else {
        $.isIe9 = true;
      }
    } else if(!$.support.style) {
      $.isUnderIe7 = true;
    } else {
      $.isIe8 = true;
    }

    if($.isChrome || $.isFirefox || $.isSafari || $.isIe9) {
      $.isTargetBrowser = true;
    }
  }

  /**
   * 文字列がnullまたはブランクかのチェックを行う。
   * @param {String} str 文字列
   * @return {boolean} 文字列がnullかブランクの場合true、その他の場合はfalse
   */
  $.l__.isNullBlank = function(str) {
    return (str == null || str === '');
  };

  /**
   * div要素を作成する
   * @param {} addTarget 追加要素
   * @param {String} className クラス名
   * @return {boolean} 文字列のdiv要素
   */
  $.l__.createDiv = function(addTarget, className, flag) {
    return $.l__.createElement(addTarget, 'div', className, flag);
  };

  /**
   * span要素を作成する
   * @param {} addTarget 追加要素
   * @param {String} className クラス名
   * @return {boolean} 文字列のspan要素
   */
  $.l__.createSpan = function(addTarget, className) {
    return $.l__.createElement(addTarget, 'span', className);
  };

  /**
   * html要素を作成する
   * @param {} addTarget 追加要素
   * @param {String} 要素の種類
   * @param {String} className クラス名
   * @return {Object} 文字列のspan要素
   */
  $.l__.createElement = function(addTarget, elementType, className, noEscape) {

    var $element =
      $('<' + elementType + '/>', {
        'class' : className
      });

    if(addTarget == null){
    } else if(typeof addTarget == 'string') {
      if(noEscape) {
        $element.html(addTarget);
      } else {
        $element.text(addTarget);
      }
    } else if(typeof addTarget == 'object') {
      $element.append(addTarget);
    }

    return $element;
  };

  /**
   * cssのピクセル値をNumber型で取得する
   * @param {String} $target 取得対象のオブジェクト
   * @param {String} property 属性名
   * @return {Number} cssのピクセル値
   */
  $.l__.getPixelValue = function($target, property) {

    var value = $target.css(property);

    if(!value) {
      return 0;
    }
    if(typeof(value) === 'number') {
      return value;
    }
    return Number(value.replace(/px/, ''));
  };

  $.l__.getPixelValueSummary = function($targets, property) {

    var returnValue = 0;

    for(var i = 0; i < $targets.length; i++) {

      returnValue += $.l__.getPixelValue($targets[i], property);
    }

    return returnValue;
  };

  $.l__.getPixelValueSummaryOne = function($target, properties) {

    var returnValue = 0;

    for(var i = 0; i < properties.length; i++) {

      returnValue += $.l__.getPixelValue($target, properties[i]);
    }

    return returnValue;
  };

  /**
   * 画像を親要素の上下の中央にセットする
   * @param {Object} $parentObject 親要素
   * @param {Object} $imageObject 画像要素
   */
  $.l__.setImagePosition = function($parentObject, $imageObject) {

    var parentHeight = $.l__.getPixelValueSummaryOne($parentObject, ['height', 'border-left-height', 'border-right-height', 'margin-top', 'margin-bottom']);
    var imageHeight = $.l__.getPixelValueSummaryOne($imageObject, ['height', 'border-left-height', 'border-right-height', 'margin-top', 'margin-bottom']);
    var newTop = imageHeight == parentHeight ? '' : (parentHeight - imageHeight) / 2;
    $imageObject.css('top', newTop);
  };

  /**
   * ボタン切り替え処理を行う。
   * @param {Object} button ボタンオブジェクト
   * @param {Object} flagValue 指定の値に切り替える場合設定する。
   * @return 切り替えた後のボタンの値
   */
  $.l__.toggleButton = function(button, flagValue) {

    var clickedButtonArray = button.attr('src').split('__');
    var clickedFlag
      = !$.l__.isNullBlank(flagValue)
        ? flagValue
        :
      clickedButtonArray[1].split('.')[0] == 0
        ? 1
        : 0;
    button.attr('src', clickedButtonArray[0] + '__' + clickedFlag + '.png');

    return clickedFlag;
  };

  /**
   * メール文字列のチェックを行う
   * @param {String} mailValue メール文字列
   * @return フォーマットに合致する場合はtrue,その他はfalse
   */
  $.l__.checkMailValue = function(mailValue) {
    return mailValue.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)*[.]([a-zA-Z0-9\_-])([a-zA-Z0-9\._-])*$/) != null;
  };

  /**
   * phpで変換済みのリンク対象文字列を、リンク文字列に変換する
   * @param {String} str リンク対象文字列
   * @return リンク文字列
   */
  $.l__.replaceLink = function(str) {

    str = str.escapeHtml();
    str = $.l__.replaceLinkEach(str, 'http_link');
    str = $.l__.replaceLinkEach(str, 'twitter_account');
    str = $.l__.replaceLinkEach(str, 'twitter_hash');
    return str;
  };

  /**
   * phpで変換済みのリンク対象文字列を、リンク文字列に変換する
   * @param {String} str リンク対象文字列
   * @return リンク文字列
   */
  $.l__.replaceLink = function(str) {

    str = str.escapeHtml();
    str = $.l__.replaceLinkEach(str, 'http_link');
    str = $.l__.replaceLinkEach(str, 'twitter_account');
    str = $.l__.replaceLinkEach(str, 'twitter_hash');
    return str;
  };

  /**
   * phpで変換済みのリンク対象文字列を、種別ごとにリンク文字列に変換する
   * @param {String} str リンク対象文字列
   * @param {String} type リンク種別
   * @param {String} disable リンク無効の場合
   * @return リンク文字列
   */
  $.l__.replaceLinkEach = function(str, type, disable) {

    if($.l__.isNullBlank(str)) {
      return;
    }

    var regexp = new RegExp('::l___' + type + '::(.*?)::/l___' + type + '::', 'g');

    if(disable) {
      return str.replace(regexp, '$1');
    } else if(type == 'http_link') {
      return str.replace(regexp, '<a class="no_bubbling_click" target="blank" href="$1">$1</a>');
    } else if(type == 'twitter_account') {
      return str.replace(regexp, '<a class="no_bubbling_click" target="blank" href=\"http://twitter.com/$1">$1</a>');
    } else if(type == 'twitter_hash') {
      return str.replace(regexp, '<a class="no_bubbling_click" target="blank" href="http://search.twitter.com/search?q=$1">$1</a>');
    }
  };

  /**
   * チェック時文言の切り替えを行う
   * @param {Object} $checkTarget チェック対象オブジェクト
   * @param {Boolean} isWrong チェックOKの場合はtrue、それ以外の場合はfalse
   * @param {Boolean} isBlank チェック対象の文字列があるの場合はtrue、それ以外の場合はfalse
   * @return リンク文字列
   */
  $.l__.toggleCheckMessage = function($checkTarget, isWrong, isBlank) {

    $checkTarget.find('.input_ok_ng').show();
    $checkTarget.find('.success_changing').hide();

    if(!isWrong) {

      $checkTarget.find('.input_ok').css('opacity', '1');
      $checkTarget.find('.input_ng').css('opacity', '0');

      return true;
    }

    if(isBlank) {
      $checkTarget.find('.input_ok').css('opacity', '0');
      $checkTarget.find('.input_ng').css('opacity', '0');
    } else {
      $checkTarget.find('.input_ok').css('opacity', '0');
      $checkTarget.find('.input_ng').css('opacity', '1');
    }

    return false;
  };

  /**
   * 記事中のアイキャッチ画像を表示する
   * @param {Object} $displayTarget アイキャッチを表示する対象
   * @param {String[]} urls 記事のURL
   * @param {String} className アイキャッチ画像に付加するclass名
   * @param {Boolean} isDisplayTitle タイトルを表示する場合はtrue
   * @param {Boolean} isBack バックグラウンド画像とする場合はtrue
   */
  $.l__.displayArticleEyecatch = function(paramObject, eyecatchTitle, eyecatchImage, originalUrl) {

    $.l__.doParallelAjaxAction(
      $.l__.emptyFunction,
      {
        'script_type' : 'get_article_eyecatch',
        'urls[]' : paramObject.urls
      },
      function(data) {

        var isExistUrl = false;

        var parsedData = $.parseJSON(data);
        for(var i = 0; i < parsedData.length; i++) {

          var url = parsedData[i][2];
          $.l__.addEyecatch(paramObject, parsedData[i][0], parsedData[i][1], url);
          if(url == originalUrl) {
            isExistUrl = true;
          }
        }

        if(originalUrl && !isExistUrl) {
          $.l__.addEyecatch(paramObject, eyecatchTitle, eyecatchImage, originalUrl);
        }
      }
    );
  };

  $.l__.addEyecatch = function(paramObject, eyecatchTitle, eyecatchImage, originalUrl) {

    if(paramObject.isBack) {

      paramObject.$displayTarget.css('background-image', 'url("' + eyecatchImage + '")');
      return;
    }

    var className = paramObject.additionalClassName ? paramObject.className + '_parent ' + paramObject.additionalClassName : paramObject.className + '_parent';
    var $parent = $('<div />', {
      'class' : className
    });

    var $titleLink = $('<a />', {
      'target' : 'black',
      'href' : originalUrl,
      'class' : 'no_bubbling_click'
    })
    .text(eyecatchTitle);
    $title = $.l__.createDiv($titleLink, paramObject.className + '_title');

    paramObject.$displayTarget.append($parent);

    $parent.append($('<img />', {
      'class' : paramObject.className,
      'src' : eyecatchImage
    })
    .bind('load', function() {
      var $image = $(this);
      var $tempParent = $image.parent();
      var imageWidth = $.l__.getPixelValueSummaryOne($image, ['width', 'border-left-width', 'border-right-width', 'margin-left', 'margin-right']);
      var displayTargetWidth = $.l__.getPixelValueSummaryOne(paramObject.$displayTarget, ['width', 'border-left-width', 'border-right-width', 'margin-left', 'margin-right']);
      if(imageWidth < displayTargetWidth) {
        $tempParent.css({
          'width' : $.l__.getPixelValue($image, 'width'),
          'height' : $.l__.getPixelValue($image, 'height')
        });
      }

      if(paramObject.isDisplayTitle) {

        $tempParent = $image.parent();

        $title_ = $tempParent.find('.' + paramObject.className + '_title');

        $title_.css({
          'width' : $.l__.getPixelValue($image, 'width')
        });

        $tempParent.append(
          $('<div />', {
            'class' : 'modal_right_image_title_back'
          })
          .css('width', $.l__.getPixelValue($image, 'width'))
        );
      }
    }));

    if(paramObject.isDisplayTitle) {
      $parent.append($title);
    }

    if(paramObject.additionalClassName) {
      $parent[0].sort = $('.' + paramObject.additionalClassName).length;
    }
  };

  /**
   * 並列で実行出来るajax通信処理を行う。
   * @param {Object} preAction ajax通信の前に行う処理
   * @param {Object} data データの配列。内容は処理内容によって異なるが、処理名を表すactionNameは必須。
   * @param {Object} mainAction ajax通信結果を受けて行う処理
   * @param {Object} postAction ajax通信の後に行う処理
   */
  $.l__.doParallelAjaxAction = function(preAction ,data, mainAction, postAction) {

    mainAction = mainAction ? mainAction : $.l__.emptyFunction;
    postAction = postAction ? postAction : $.l__.emptyFunction;

    // ajax通信の前に行う処理を実施。
    preAction();

    // ajax通信を行う。
    $.ajax({
      'url' : '../script_controller.php',
      'data' : data,
      'type' : 'POST',
      'success' : function(returnData, status, xhr) {
        // ajax通信結果を処理する。
        mainAction(returnData);
      },
      'complete' : function() {
        // ajax通信の後に行う処理を実施。
        postAction();
      }
    });
  };

  /**
   * 排他でajax通信処理を行う。
   * @param {Object} event 処理のトリガイベント
   * @param {Object} preAction ajax通信の前に行う処理
   * @param {Object} mainAction ajax通信結果を受けて行う処理
   * @param {Object} postAction ajax通信の後に行う処理
   * @param {Object} data データの配列。内容は処理内容によって異なるが、処理名を表すactionNameは必須。
   * @param {boolean} isNotDisplayChangingImage 更新中画像を表示しない場合はtrue
   * @param {Object} addChangeImageTarget 更新中画像を表示するオブジェクト
   */
  $.l__.doExclusiveAjaxAction = function(event, preAction, mainAction, postAction ,data, isNotDisplayChangingImage, addChangeImageTarget) {

    // 排他中の場合は処理を行わない。
    if(l__Obj.isDoingExclusiveAjaxAction) {
      return;
    }

    // 排他フラグを立てる。
    l__Obj.isDoingExclusiveAjaxAction = true;

    if(!isNotDisplayChangingImage) {

      var refleshImage = $('<img>', {
        'src' : '../img/icon/card/operation/loading.gif',
        'id' : 'cd_reflesh'
      });

      // 更新中画像を表示する。
      if(existTarget(addChangeImageTarget)) {

        var addChangeImageTargetWidth = addChangeImageTarget.css('width').replace(/px/, '');

        refleshImage.css({
          'left' : (addChangeImageTargetWidth - refleshImageWidth) / 2
        });
        addChangeImageTarget.append(refleshImage);
      }
      else {

        refleshImage.css({
          'top' : ($(window).height() - refleshImageWidth) / 2,
          'left' : ($(window).width() - refleshImageWidth) / 2
        });
        $('body').append(refleshImage);
      }
    }

    // ajax通信の前に行う処理を実施。
    preAction();

    // ajax通信を行う。
    $.ajax({
      'url' : '../script_controller.php',
      'data' : data,
      'type' : 'POST',
      'success' : function(returnData, status, xhr) {
        // ajax通信結果を処理する。
        mainAction(returnData);
      },
      'complete' : function() {

        // ajax通信の後に行う処理を実施。
        postAction();

        if(!isNotDisplayChangingImage) {
          // 更新中画像を消す。
          $('#cd_reflesh').remove();
        }

        // 排他フラグを下ろす。
        l__Obj.isDoingExclusiveAjaxAction = false;
      }
    });
  };
});
