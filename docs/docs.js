(function() {
	if (!document.getElementsByClassName) {
		return;
	}
	if (Mobilebone.support == false) {
		document.querySelector(".page.out").className = "page";
	}
	var ele_version = document.getElementsByClassName("version");
	[].slice.call(ele_version).forEach(function(version, index) {
		version.innerHTML = "(v" + Mobilebone.VERSION + ")";
	});
	
	getVersion = function(pagein) {
		pagein.querySelector(".version").innerHTML = "v" + Mobilebone.VERSION;
	};
	
	tabButtonActive = function(pagein) {
		var target = document.querySelectorAll(".tabview a")[pagein.id.replace(/\D/g, "") - 1];
		var eleAcive = document.querySelector(".tabview .active");
		if (eleAcive) eleAcive.classList.remove("active");
		if (target) target.classList.add("active");
	};
})();