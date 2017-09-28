// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the baiduyun real downlink.
 */

var dpan = {
  init: function(){
    var self = this;
    if (window.location.pathname !== '/disk/home' ) return false;
    var timer = setInterval(function(){
      if ($('.file-name').length > 0) {
        clearInterval(timer);
        var pathname = decodeURIComponent(window.location.hash.split('path=')[1]).split('&')[0];
        console.log('get_list_done: ' + pathname);
        self.loaded();
      } else {
        console.log('loop');
      }
    }, 500);
  },
  loaded: function(){
    var self = this;
    var $fileName = $('.file-name');
    $btn = '<a class="g-button get-real-link" href="javascript:void(0);"><span class="g-button-right"><em class="icon icon-beauty" title="Get Link"></em><span class="text" style="width: auto;">Get Link</span></span></a>';
    $fileName.find('.text').next('div').css('width', '136px').find('.undefined').append($btn);

    self.clickEvent();
  },
  clickEvent: function(){
    var self = this;
    $('.get-real-link').click(function(){
      var $fileName = $(this).closest('.file-name');
      var fileName = $fileName.find('.text a').attr('title');
      var pathname = decodeURIComponent(window.location.hash.split('path=')[1]).split('&')[0];
      var path = pathname + '/' + fileName;
      $.getJSON('https://d.pcs.baidu.com/rest/2.0/pcs/file?method=locatedownload&app_id=250528&ver=2.0&dtype=0&esl=1&ehps=0&check_blue=1&clienttype=1&path=' + path, function(ret){
        self.showLink(ret.urls);
      });
    });
  },
  showLink: function(links){
    var html = [
      '<style>.show-link{width:600px;height:280px;padding:15px;position:fixed;right:9px;bottom:0;background:#fff;z-index:2;border:1px solid #ccc;overflow-y:auto;}',
      '.show-link li{padding:10px;}',
      '.show-link .ipt{width:100%;}</style>',
      '<div class="show-link"></div>'
    ];
    var $links = [
      '<ul>',
      '<li>以下是各节点下载直链，5小时内有效，可用迅雷下载.</li>'
    ];
    links.forEach(function(link){
      $links.push('<li><input class="ipt" type="text" value="' + link.url + '"/></li>');
    });
    $links.push('</ul>');

    if (!$('.show-link').length) $('body').append(html.join(''));

    $('.show-link').html($links.join(''));
  }
};
dpan.init();

window.addEventListener('hashchange', function(){
  dpan.init();
});
