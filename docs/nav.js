(function() {
	var aside = document.querySelector("aside");
	if (aside == null) return;
	
	var key = window.navKey, html = '<nav>', active = '', matchs = false;
	
	["Mobilebone.support", "Mobilebone.VERSION", "Mobilebone.autoInit", "Mobilebone.captureLink", "Mobilebone.rootTransition", "Mobilebone.mergeCallback", "Mobilebone.classPage", "Mobilebone.classMask", "Mobilebone.pushStateEnabled", "Mobilebone.transition()", "Mobilebone.getCleanUrl()", "Mobilebone.getPage()", "Mobilebone.createPage()", "Mobilebone.getFunction()", "Mobilebone.ajax()", "Mobilebone.isBack()", "Mobilebone.jsonHandle()", "Mobilebone.init()", "Mobilebone.handleTapEvent()", "otherAnonymousAPIs", "data-title", "data-root", "data-params", "data-callbackKeys", "data-mask", "data-rel", "data-ajax", "data-ajaxKeys"].forEach(function(innerhtml) {
		if (matchs == true) {
			active = '';
		} else if (key && (key == innerhtml || new RegExp(key).test(innerhtml))) {
			active = ' active';
			matchs = true;
		}
		html = html + '<a href="'+ innerhtml.replace("()", "") +'.html" class="nav-a'+ active +'" data-mask data-rel="auto">'+ innerhtml +'</a>';		
	});
	
	html += '</nav>';
	
	html = '<h2><a href="'+ (matchs? 'index.html': '#indexPage') +'" data-rel="auto">mobilebone.js<span class="version"></span></a></h2>' + html;
	
	aside.innerHTML = html;
})();