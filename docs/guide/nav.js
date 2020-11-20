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
});

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
	[].slice.call(navAll).forEach(function(nav) {
		nav.classList.remove("active");
		if (eleNav) {
			eleNav.classList.add("active");
		}
	});

	if (eleNav && !eleNav.isSubNav) {
		[].slice.call(eleH3s).forEach(function (eleH, index) {
			var id = urlKey.replace(/\W/g, '') + index;
			htmlList += '<label for="'+ id +'" class="nav-a" href>'+ eleH.textContent +'</label>';
			eleH.insertAdjacentHTML('beforeend', '<input type="radio" name="'+ id.replace(/\d/g, '') +'" id="'+ id +'">');
		});

        eleNav.classList.add('active');
        eleNav.insertAdjacentHTML('afterend', htmlSubNav.replace('${list}', htmlList));
        
        eleNav.isSubNav = true;
	}
};

document.addEventListener('click', function (event) {
    if (event.target && event.target.type == 'radio') {
        var id = event.target.id;

        [].slice.call(document.querySelectorAll('nav label[for]')).forEach(function (eleLabel) {
            eleLabel.classList.remove('active');
        });

        var eleTargetLabel = document.querySelector('label[for="'+ id +'"]');
        if (eleTargetLabel) {
            eleTargetLabel.classList.add('active');
        }
    }
});

