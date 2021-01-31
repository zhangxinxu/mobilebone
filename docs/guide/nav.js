if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var eleAside = document.querySelector('#aside');
// 加载此内容
// fetch(eleAside.getAttribute('href')).then(function (res) {
//     return res.text()
// }).then(function (html) {
    
// });

eleAside.innerHTML = '<h4 class="nav-h"><span class="nav-a">基础介绍</span></h4>\
<nav>\
    <a href="install.html" class="nav-a" data-mask>安装</a>\
    <a href="#indexPage" id="navIndexA" class="nav-a" data-mask>开始</a>\
    <a href="events.html" class="nav-a" data-mask>事件</a>\
    <a href="router.html" class="nav-a" data-mask>路由</a>\
</nav>\
<h4 class="nav-h"><span class="nav-a">开始深入</span></h4>\
<nav>\
    <a href="param.html" class="nav-a" data-mask>传参</a>\
    <a href="cache.html" class="nav-a" data-mask>页面管理</a>\
    <a href="animate.html" class="nav-a" data-mask>过场动画</a>\
    <a href="loading.html" class="nav-a" data-mask>加载动画</a>\
    <a href="inner.html" class="nav-a" data-mask>内部切换</a>\
    <a href="ajax.html" class="nav-a" data-mask>请求</a>\
    <a href="init.html" class="nav-a" data-mask>初始化</a>\
</nav>';

if (window.navKey) {
    var eleNav = eleAside.querySelector('[href*="'+ window.navKey +'"]');
    if (eleNav) {
        eleNav.classList.add('active');
    }
    var eleNavIndex = document.querySelector('#navIndexA');
    if (eleNavIndex) {
        eleNavIndex.href = 'index.html';
    }
}

// 首次载入时候滚动位置
var eleContent = document.querySelector('.page.in .content');
if (eleContent) {
    var storeKey = 'scrollTop' + (location.hash.replace(/\W/g, '') || eleContent.parentElement.id);
    if (localStorage[storeKey]) {
        eleContent.style.scrollBehavior = 'auto';
        eleContent.scrollTop = localStorage[storeKey];
        localStorage.removeItem(storeKey);
        eleContent.offsetWidth;
        eleContent.style.scrollBehavior = '';
    }
}

// 记住滚动位置，如果是F5刷新
window.addEventListener('keydown', function (event) {
	if (event.keyCode == 116) {
		var eleContent = document.querySelector('.page.in .content');
		if (eleContent) {
			localStorage['scrollTop' + (location.hash.replace(/\W/g, '') || eleContent.parentElement.id)] = eleContent.scrollTop;
        }
	}
});

if (!window.IntersectionObserver) {
    IntersectionObserver = function () {};
    IntersectionObserver.prototype.observe = function () {};
}

var lastScrollTop = document.scrollingElement.scrollTop;

var hIntersectionObserver = new IntersectionObserver(function (entries) {
    var radio = null;

    entries.reverse().forEach(function (entry) {
        if (entry.isIntersecting) {
            radio = entry.target.querySelector('[type="radio"]');
            // 导航从进来到不进来 
            if (radio) {
                radio.checked = true;
            }
        } else {
            var eleAllRadios = [].slice.call(document.querySelectorAll('.in h3 [type="radio"]'));
            var index = eleAllRadios.findIndex(function (ele) {
                return ele == entry.target;
            });
            if (index == -1) {
                return;
            }
            // 对应的导航元素高亮
            if (document.scrollingElement.scrollTop > lastScrollTop) {
                eleAllRadios[index + 1] && (eleAllRadios[index + 1].checked = true);
            } else if (eleAllRadios[index - 1]) {
                eleAllRadios[index - 1].checked = true;
            }
        }
    });

    lastScrollTop = document.scrollingElement.scrollTop;
});

/**
 * 反转义HTML标签的方法
 * @param  {String} str 需要反转义的字符串
 * @return {String}     反转义后的字符串
 */
var funDecodeHTML = function (str) {
    if (typeof str == 'string') {
        return str.replace(/&lt;|&gt;|&amp;/g, function (matches) {
            return ({
                '&lt;': '<',
                '&gt;': '>',
                '&amp;': '&'
            })[matches];
        });
    }

    return '';
};

var funSubNav = function (elePageIn) {
    elePageIn = elePageIn || document.querySelector('.page.in');
    if (!elePageIn) {
		return;
    }

    var eleH3s = elePageIn.querySelectorAll('.content h3');

	var urlKey = window.navKey || location.hash.replace("#&", "");
    var eleNav = document.querySelector('aside a[href*="'+ urlKey +'"]');

	var htmlSubNav = '<div class="nav-secondary">${list}</div>';
    var htmlList = '';
    
    var navAll = document.querySelectorAll('#aside a');
	navAll.forEach(function(nav) {
		nav.classList.remove("active");
		if (eleNav) {
			eleNav.classList.add("active");
		}
	});

	if (eleNav && !eleNav.isSubNav) {
		eleH3s.forEach(function (eleH, index) {
			var id = urlKey.replace(/\W/g, '') + index;
            htmlList += '<label for="'+ id +'" class="nav-a" href>'+ eleH.textContent.replace('？', '') +'</label>';
            eleH.setAttribute('for', id);
            eleH.insertAdjacentHTML('beforeend', '<input type="radio" name="'+ id.replace(/\d/g, '') +'" id="'+ id +'">');
            // 观察
            hIntersectionObserver.observe(eleH);
		});

        eleNav.classList.add('active');
        eleNav.insertAdjacentHTML('afterend', htmlSubNav.replace('${list}', htmlList));
        
        eleNav.isSubNav = true;

        // 边界的处理
        var eleScrollX = elePageIn.querySelector('.content');
        if (eleScrollX && eleH3s.length) {
            eleScrollX.addEventListener('scroll', function () {
                if (this.scrollTop === 0) {
                    this.querySelector('h3 [type="radio"]').checked = true;
                }
            });
        }
    }
    
    elePageIn.querySelectorAll('.version:empty').forEach(function (ele) {
        ele.innerHTML = Mobilebone.VERSION;
    });

    

    // 代码的运行与预览
    var elesPreRunable = elePageIn.querySelectorAll('pre[is-runable]');
    elesPreRunable.forEach(function (pre) {
        if (pre.originContent) {
            return;
        }

        pre.originContent = pre.innerHTML;

        // 反转义为HTML
        var html = funDecodeHTML(pre.originContent).replace(/\.\/dist/g, 'https://cdn.jsdelivr.net/npm/mobilebone/dist');

        // 创建按钮
        var button = document.createElement('button');
        button.textContent = '运行';
        button.addEventListener('click', function (event) {
            event.cancelBubble = true;

            if (this.referIframe) {
                this.referIframe.setAttribute('open', '');
                return;
            }
            // 如果是PC电脑，弹框显示，
            var iframe = document.createElement('iframe');
            iframe.className = 'iframe-example';
            iframe.src = URL.createObjectURL(new Blob([html], {
                'type': 'text/html'
            }));
            iframe.setAttribute('open', '');

            pre.insertAdjacentElement('afterend', iframe);
        }); 

        pre.insertAdjacentElement('afterbegin', button);
    });
};

funSubNav();

// 处于预览状态的iframe点击隐藏
document.addEventListener('click', function (event) {
    var eleTarget = event.target;
    if (eleTarget.closest && eleTarget.closest('iframe[open]')) {
        return;
    } else if (eleTarget.hasAttribute('open') || eleTarget.tagName == 'A' || eleTarget.tagName == 'BUTTON') {
        return;
    }
    var eleIframeOpen = document.querySelectorAll('iframe[open]');

    eleIframeOpen.forEach(function (iframe) {
        if (iframe != eleTarget) {
            iframe.removeAttribute('open');
        }
    });
});

