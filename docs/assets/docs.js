(function () {
	if (!document.getElementsByClassName) {
		return;
	}
	if (Mobilebone.support == false) {
		document.querySelector('.page.out').className = 'page';
	}
	var ele_version = document.getElementsByClassName('version');
	[].slice.call(ele_version).forEach(function(version, index) {
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

	eleHeader.innerHTML = '<h2 class="logo-h"><a href="index.html" data-rel="auto" class="logo">mobilebone.js<span class="version">'+ Mobilebone.VERSION +'</span></a></h2><nav class="header-nav"><a href="../guide/" class="header-nav-a">教程</a><a href="../api/" class="header-nav-a">API文档</a><a href="https://github.com/zhangxinxu/mobilebone" class="header-nav-a header-nav-r" target="_blank">共同建设</a></nav>';

	var pathname = location.pathname;
	if (/\/api\//.test(pathname)) {
		eleHeader.querySelector('a[href*="api"]').classList.add('active');
	} else if (/\/guide\//.test(pathname)) {
		eleHeader.querySelector('a[href*="guide"]').classList.add('active');
	}
})();


