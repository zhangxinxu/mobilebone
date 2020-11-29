(function () {
	if (!document.getElementsByClassName) {
		return;
	}
	if (Mobilebone.support == false) {
		document.querySelector('.page.out').className = 'page';
	}
	var eleVersions = document.getElementsByClassName('version');
	[].slice.call(eleVersions).forEach(function(version) {
		version.innerHTML = '(v' + Mobilebone.VERSION + ')';
	});
	
	getVersion = function (pagein) {
		pagein.querySelector('.version').innerHTML = 'v' + Mobilebone.VERSION;
	};
	
	tabButtonActive = function (pagein) {
		var target = document.querySelectorAll('.tabview a')[pagein.id.replace(/\D/g, '') - 1];
		var eleAcive = document.querySelector('.tabview .active');
		if (eleAcive) eleAcive.classList.remove('active');
		if (target) target.classList.add('active');
	};

	// 创建头部
	var eleHeader= document.querySelector('header');

	eleHeader.innerHTML = '<h2 class="logo-h"><a href="index.html" data-rel="auto" class="logo">mobilebone.js<span class="version">'+ Mobilebone.VERSION +'</span></a></h2><nav class="header-nav"><a href="../guide/" class="header-nav-a" data-ajax="false">教程</a><a href="../api/" class="header-nav-a" data-ajax="false">API文档</a><a href="../style/" class="header-nav-a" data-ajax="false">推荐指南</a><a href="../examples/" class="header-nav-a" data-ajax="false">示例</a><a href="https://github.com/zhangxinxu/mobilebone" class="header-nav-a header-nav-r" target="_blank">共同建设</a></nav>';

	var pathname = location.pathname;
	if (/\/api\//.test(pathname)) {
		eleHeader.querySelector('a[href*="api"]').classList.add('active');
	} else if (/\/guide\//.test(pathname)) {
		eleHeader.querySelector('a[href*="/guide"]').classList.add('active');
	}
})();

// 导航与菜单栏的高亮处理
let eleScriptSmartFor = document.createElement('script');
eleScriptSmartFor.src = 'https://www.zhangxinxu.com/study/202011/smart-for.js';
eleScriptSmartFor.onload = function () {};
document.head.appendChild(eleScriptSmartFor);



