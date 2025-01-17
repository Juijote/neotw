/*\
title: $:/plugins/oeyoews/tiddlywiki-echarts/widget.js
type: application/javascript
module-type: widget

tiddlywiki-echarts widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const echarts = require('echarts.min.js');

  class EchartWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      /**
       * 在TiddlyWiki中，小部件的属性存储在一个称为`attributes`的特殊对象中，而不是在DOM元素本身中。因此，要检索小部件的属性，我们需要使用`this.attributes`，而不是像在DOM中一样使用`getAttribute()`。
      尽管它们的名称相似，但这两种方法之间存在一些重要区别：
      - `getAttribute()`是Dom API中的方法，它可以在 HTML 元素上获取指定属性的值。
      - `this.attributes`是TiddlyWiki小部件API中的属性，用于存储小部件的属性和值。
      另外，请注意，在TiddlyWiki中，使用`attributes`属性时，返回的是一个JavaScript对象，而不是字符串。因此，我们需要从该对象中提取所需的属性值。
       */
      // const theme = this.getAttribute('theme', 'light');

      const tiddlerTitle = this.getAttribute('tiddler');
      if (tiddlerTitle) {
        const tiddler = $tw.wiki.getTiddler(tiddlerTitle);
        if (tiddler) {
          try {
            const tiddlerFields = JSON.parse(tiddler.fields.text);
            Object.assign(this.attributes, tiddlerFields);
          } catch (e) {
            console.error('Failed to parse JSON from tiddler:', e);
          }
        }
      }

      const {
        title = 'Echarts',
        type = 'bar',
        theme = 'light',
        width = '600px',
        height = '400px',
        className = '',
        xdata = '',
        ydata = '',
        yname = '',
      } = this.attributes;
      console.log(this.attributes);

      const time = new Date().getTime();
      const id = time;
      const div = this.document.createElement('div');
      div.id = id;
      div.textContent = 'Loading ...';
      div.style.width = width;
      div.style.height = height;
      div.className = className;
      parent.insertBefore(div, nextSibling);
      this.domNodes.push(div);

      const chartContainer = document.getElementById(id);
      const myChart = echarts.init(chartContainer, theme);

      const defaultOption = {
        color: ['#00ffff'], // 指定颜色值
        title: {
          text: title,
        },
        tooltip: {},
        xAxis: {
          data: [
            { value: 'vue', itemStyle: { color: 'red' } },
            'react',
            'javaScript',
            'journal',
            'css',
            'tailwindcss',
          ],
        },
        yAxis: {},
        series: [
          {
            name: 'count',
            type: type,
            data: [1, 1, 2, 3, 5, 6],
          },
        ],
      };

      myChart.setOption(defaultOption);
    }
  }

  exports.oecharts = EchartWidget;
})();
