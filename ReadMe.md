mobilebone.js
=============

<img src="https://www.zhangxinxu.com/GitHub/mobilebone/docs/assets/logo-128.png">

单页切换骨架。适用于移动Web APP, Hybrid混合APP, 单页H5或PC应用。官方网站：<a href="http://www.mobilebone.org/">http://www.mobilebone.org/</a>


设计理念
------------------
mobilebone本质上是一个纯UI表现层的JS插件，如果没有mobilebone.js，我们的项目依然是可以运作的，只是形式上是传统的页面跳转。明白这一点，就应该可以理解为何请求页面中的src地址的script不执行了。

这种无侵入的设计理念使得mobilebone更像是一个外挂，一个精美的外衣，日后不喜欢了，直接拿掉就可以，完全不要担心前端变化太快项目跟不上怎么办。同时，保留了传统页面SEO友好等优点。

教程和文档
------------------

狠狠地点击这里：

* <a href="https://www.zhangxinxu.com/GitHub/mobilebone/docs/guide/" style="color: #cd0000;"><strong>详细使用教程</strong></a>
* <a href="https://www.zhangxinxu.com/GitHub/mobilebone/docs/api/" style="color: #cd0000;"><strong>中文API文档</strong></a>


实例、测试和文档
------------------

**近期项目GIF录屏**

<img src="https://qidian.qpic.cn/qidian_common/349573/60b54a019ccce3709b04af2401caf4a4/0" alt=""> <img src="https://qidian.qpic.cn/qidian_common/349573/f8b6198e5e35b53604be9de6f6a083f4/0" alt="">

**真实线上项目案例**

C端视频制作：https://activity.hongxiu.com/be-video/

<p><img src="https://imgservices-1252317822.image.myqcloud.com/image/20201012/f5e3bbcezz.png"></p>

也可以手机扫描访问：
<p><img src="https://imgservices-1252317822.image.myqcloud.com/image/20201012/rrsqqyiu1w.png" width="150" height="150" /></p>

采用Vue + Mobilebone实现。

**其他案例**

<ul>
	<li>实例1-仿QQ界面：http://iancj.github.io/qq/</li>
	<li>实例2-暴走漫画制作器：http://baozoumanhua.com/mobile_makers/</li>
	<li>实例3-太湖金谷：http://wap.neeqsz.com</li>
</ul>

<ul>
	<li>测试页面：<a href="https://www.zhangxinxu.com/GitHub/mobilebone/test/">./test/index.html</a>
		<p><img src="https://qidian.qpic.cn/qidian_common/349573/6b30e1a98239bdd169b16d9570151baf/0" width="150" height="150"></p>
	</li>
</ul>

为何需要？
-------------
类原生APP的过场体验，适用于这些场景：<br>
1. 跨移动平台开发，静态页面都是index.html, 单页面，因此，需要跟原生一样的过场体验。<br>
2. Hybrid app开发，原生APP内嵌web APP, 为了两者体验一致，不至于交互太唐突，也需要无刷新过场效果。<br>
3. 就算是纯粹的移动web APP, 使用无刷新模式也不失为一种不错的选型策略。<br>
4. 对兼容性没有要求的单页PC应用，如类PowerPoint web文档，单页翻屏web站点等。


如何使用？
---------------

包引入：

```js
npm install mobilebone
```
```html
<!-- 支持import引入 -->
<script>
import Mobilebone from 'mobilebone'
// 初始化
Mobilebone.init();
</script>
<!-- 例如在Vue中 -->
<style src="mobilebone/dist/mobilebone.css">
```

也支持直接链接相关的CSS以及JS, 如下：
```html
<link rel="stylesheet" href="./src/mobilebone.css">
```
```html
<script src="./src/mobilebone.js"></script>
```

HTML结构需要有一定的要求：
<pre>body
  page
  page
  page</pre>

每个page是个满屏元素, 相当于一个独立的页面。

Mobilebone会自动捕获页面上的a元素，如果其href值存在猫腻，就会触发切换行为。例如：
```html
<a href="#targetPage">目标页面</a>
```

当click此元素时候，页面会自动无刷新切换到<code>id</code>为<code>targetPage</code>的页面。

也可以使用ajax请求。例如：
```html
<a href="detail.php?id=112">请求详情页</a>
```

所有ajax请求默认是缓存的，如果你想根据url地址不缓存，可以设置<code>data-reload</code>或者<code>data-reload="true"</code>；如果你想根据url根地址不缓存，需要设置<code>data-reload="root"</code>。

你可以控制切换的方向，任意扩展动画类型，可以被seajs, requiejs模块化加载(<code>require('mobilebone')</code>)，可以和Backbone组合使用等。

当然，上面介绍的，只是强大功能的冰山一角，更多信息请[参考这里](https://www.zhangxinxu.com/wordpress/?p=4381).

插件
----------------
<ol>
	<li><strong>mobilebone.ppt.js</strong>: 可以让web页面表现如幻灯片演示，尺寸自适应。 <a href="https://www.zhangxinxu.com/GitHub/mobilebone/plugins/ppt/index.html">demo点击这里</a>。</li>
</ol>

优势？
------------------
mobilebone.js只做了一件事情，切换。所以，JS文件很小，gzip后4~5K, 而且很灵活，几乎没有任何UI的限制，适用于各个项目各个场景。同时，巧妙提供各类缓存管理、事件管理的接口，就像是个完整健全的骨架体系，就等你来加血添肉了！<img src="https://mat1.gtimg.com/www/mb/images/face/4.gif" align="absmiddle">

许可
-------------------
MIT许可

mobilebone.js
=============
Single Page Switching bone for mobile web APP, Hybrid APP, Phonegap, ...

<pre>git clone git://github.com/zhangxinxu/mobilebone.git</pre>

use <code>npm</code>:
<pre>npm install mobilebone</pre>

Documents
------------------

<ul>
	<li>Guide documents: <a href="https://www.zhangxinxu.com/GitHub/mobilebone/docs/guide/">docs/guide/</a></li>
    <li>API documents: <a href="https://www.zhangxinxu.com/GitHub/mobilebone/docs/api/">docs/api/</a></li>
</ul>

Examples and Tests
------------------
<ol>
	<li>Example1: http://iancj.github.io/qq/</li>
	<li>Example2: http://baozoumanhua.com/mobile_makers/</li>
	<li>Example3: http://wap.neeqsz.com</li>
</ol>

<ul>
	<li>Test page: <a href="https://www.zhangxinxu.com/GitHub/mobilebone/develop/test/index.html">test/index.html</a></li>
</ul>


Why need this?
-----------------
Interaction experience is good enough to compare with the native APP. <br>
1. Phonegap that to native APP is a single index.html, We need the same switch effects as native.<br>
2. Hybrid app, as you know, mixed web-app and native-app. So, it' better that they have some switching experience.<br>
3. Even no refresh interaction is not something bad for mobile APP.

How to use?
----------------
Just include mobilebone.css and mobilebone.js, as follow:
<pre>&lt;link rel="stylesheet" href="mobilebone.css"></pre>
<pre>&lt;script src="mobilebone.js">&lt;/script></pre>

And, you should use specific HTML structure.
<pre>body
  page
  page
  page</pre>

Then Mobilebone will catch your attribute of href of 'a' element, and do switch. For example:
<pre>&lt;a href="#targetPage">target page&lt;/a></pre>

The interface will switch to page whitch's value of <code>id</code> is <code>targetPage</code> when you tap this link.

Of course, you can control the direction of switching, or use a ajax get, or as a modular loaded by seajs, requirejs using <code>require('mobilebone')</code>...

For more detail, you can [visit here](http://www.zhangxinxu.com/wordpress/?p=4381).

Plugins
----------------
<ol>
	<li><strong>mobilebone.ppt.js</strong>: make web page to powerpoint presentation. <a href="https://www.zhangxinxu.com/GitHub/mobilebone/plugins/ppt/index.html">demo here</a>.</li>
</ol>

Advantage?
--------------
what mobilebone.js do just one thing - switching. So, it's small, flexible, and no any UI restriction. In a word, it's fit for variety of designs and scenes.

License
-------------------
The MIT License





