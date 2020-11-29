if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var eleAside = document.querySelector('#aside');
// 加载此内容
fetch(eleAside.getAttribute('href')).then(function (res) {
    return res.text()
}).then(function (html) {
    eleAside.innerHTML = html;

    funSubNav();

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
});

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

var hIntersectionObserver = new IntersectionObserver(function (entries) {
    var radio = null;

    var eleScrollX = document.querySelector('.page.in .content');
    if (eleScrollX && eleScrollX.scrollTop == 0) {
        radio = eleScrollX.querySelector('h3 [type="radio"]');
        if (radio) {
            radio.checked = true;
        }
        return;
    }

    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            radio = entry.target.querySelector('[type="radio"]');
            // 导航从进来到不进来 
            if (radio) {
                radio.checked = true;
            }
        }
    });
}, {
    rootMargin: '-33% 0% -33% 0%'
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

