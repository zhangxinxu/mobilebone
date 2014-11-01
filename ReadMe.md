mobilebone.js
=============
Single Page Switching bone for mobile web APP, Hybird APP, Phonegap, ...

<pre>git clone git://github.com/zhangxinxu/mobilebone.git</pre>

use <code>npm</code>:
<pre>npm install mobilebone</pre>

Why need this?
-----------------
Interaction experience is good enough to compare with the native APP. <br>
1. Phonegap that to native APP is a single index.html, We need the same switch effects as native.<br>
2. Hybird app, as you know, mixed web-app and native-app. So, it' better that they have some switching experience.<br>
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

Advantage?
--------------
what mobilebone.js do just one thing - switching. So, it's small, flexible, and no any UI restriction. In a word, it's fit for variety of designs and scenes.

License
-------------------
The MIT License



mobilebone.js
=============
单页切换骨架。适用于移动web APP, Hybird混合APP, Phonegap开发等。

为何需要？
-------------
类原生APP的过场体验，适用于这些场景：<br>
1. Phonegap等类似跨移动开发平台，其静态页面都是index.html, 单页面，因此，需要跟原生一样的过场体验。<br>
2. Hybird app开发，原生APP内嵌web APP, 为了两者体验一致，不至于交互太唐突，也需要无刷新过场效果。<br>
3. 就算是纯粹的移动web APP, 使用无刷新模式也不失为一种不错的选型策略。


如何使用？
---------------
引入相关的CSS以及JS, 如下：
<pre>&lt;link rel="stylesheet" href="mobilebone.css"></pre>
<pre>&lt;script src="mobilebone.js">&lt;/script></pre>

HTML结构需要有一定的要求：
<pre>body
  page
  page
  page</pre>
  
每个page是个满屏元素, 相当于一个独立的页面。

Mobilebone会自动捕获页面上的a元素，如果其href值存在猫腻，就会触发切换行为。例如：
<pre>&lt;a href="#targetPage">target page&lt;/a></pre>

当tap此元素时候，页面会自动无刷新切换到<code>id</code>为<code>targetPage</code>的页面。你可以控制切换的方向，或者使用Ajax获取HTML或JSON, 可以被seajs, requiejs模块化加载(<code>require('mobilebone')</code>)，可以和Backbone组合使用等。

更多信息请[参考这里](http://www.zhangxinxu.com/wordpress/?p=4381). 

优势？
------------------
mobilebone.js只做了一件事情，切换。所以，JS文件很小，gzip后3~4K, 而且很灵活，几乎没有任何UI的限制，适用于各个项目各个场景。


许可
-------------------
MIT许可

捐赠
------------------
<img src="http://www.zhangxinxu.com/alipay.png" width="256" height="256" alt="支付鼓励">

