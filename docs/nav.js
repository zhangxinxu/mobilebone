(function() {
	var aside = document.querySelector("aside");
	if (aside == null) return;
	
	var key = window.navKey, html = '<nav>', active = '', matchs = false;
	
	["Mobilebone.support", "Mobilebone.VERSION", "Mobilebone.autoInit", "Mobilebone.captureLink", "Mobilebone.captureForm", "Mobilebone.rootTransition", "Mobilebone.mergeCallback", "Mobilebone.classAnimation", "Mobilebone.classPage", "Mobilebone.classMask", "Mobilebone.pushStateEnabled", "Mobilebone.evalScript", "Mobilebone.transition()", "Mobilebone.getCleanUrl()", "Mobilebone.getPage()", "Mobilebone.createPage()", "Mobilebone.remove()", "Mobilebone.getFunction()", "Mobilebone.ajax()", "Mobilebone.submit()", "Mobilebone.isBack()", "Mobilebone.jsonHandle()", "Mobilebone.init()", "Mobilebone.handleTapEvent()", "otherAnonymousAPIs", "data-title", "data-root", "data-form", "data-params", "data-callbackKeys", "data-mask", "data-rel", "data-ajax", "data-reload", "data-ajaxKeys", "data-preventDefault", "data-container", "data-classPage"].forEach(function(innerhtml) {
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