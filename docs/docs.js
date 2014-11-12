(function() {
	var ele_version = document.getElementsByClassName("version");
	[].slice.call(ele_version).forEach(function(version, index) {
		version.innerHTML = "(v" + Mobilebone.VERSION + ")";
	});
	
	getVersion = function(pagein) {
		pagein.querySelector(".version").innerHTML = "v" + Mobilebone.VERSION;
	};	
})();