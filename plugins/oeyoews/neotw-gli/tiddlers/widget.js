/*\
title: $:/plugins/oeyoews/neotw-gli/widget.js
type: application/javascript
module-type: widget

neotw-gli widget

\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  class GLIWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    async render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const url =
        'https://api.github.com/repos/oeyoews/neotw/commits?per_page=1';

      const divNode = this.document.createElement('div');
      divNode.className = this.getAttribute('class') || '';
      divNode.textContent = 'Loading ...'; // 显示loading

      try {
        const response = await fetch(url);
        const data = await response.json();

        // 提取最后一次提交的时间戳
        const timestamp = new Date(data[0].commit.author.date).getTime();
        // 格式化时间戳为字符串
        const timeStr = new Date(timestamp).toLocaleString();
        divNode.textContent = `Last commit: ${timeStr}`; // 显示时间字符串
      } catch (error) {
        console.error(error);
        divNode.textContent = 'Error loading data'; // 显示错误信息
        divNode.className = 'text-red-500';
      }

      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
    }
  }

  exports['gli'] = GLIWidget;
})();