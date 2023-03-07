(function () {
  var twmTiddler = '$:/plugins/oeyoews/neotw-music/config';
  var twmTiddlerGet = $tw.wiki.getTiddler(twmTiddler);
  var config = twmTiddlerGet ? twmTiddlerGet.fields : {};
  var metingjs = document.createElement('meting-js');
  if (!config.id) {
    alert('检测到你没有设置TWM id, 默认使用 2916766519');
  }
  metingjs.setAttribute('server', config.server || netease);
  metingjs.setAttribute('id', config.id || 2916766519);
  metingjs.setAttribute('type', config.type);
  metingjs.setAttribute('order', config.order);
  metingjs.setAttribute('loop', config.loop);
  metingjs.setAttribute('preload', config.preload);
  metingjs.setAttribute('mutex', config.mutex);
  metingjs.setAttribute('fixed', config.fixed);
  metingjs.setAttribute('lrc-type', config.lrc_type);
  metingjs.setAttribute('list-olded', config.list_olded);
  document.body.appendChild(metingjs);
  console.log(`🎶 当前歌单为 ${config.server} && ${config.id} `);
})();