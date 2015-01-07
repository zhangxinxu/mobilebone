if (window.Mobilebone && Mobilebone.support) {
	(function(window, document, undefined) {
		var pages = document.querySelectorAll("." + Mobilebone.classPage),
			length_page = pages.length;
			index_page = 0, 
			hash = location.hash.replace("#&", "");
			
		[].slice.call(pages).forEach(function(page, index) {
			if (!page.id) page.id = "page" + (index+1);
			
			if (hash != "" && hash != "#" && page.id == hash) {
				index_page = index;
			}
		});
		
		var prev = function() {
			if (index_page > 0 && Mobilebone.transition(pages[index_page-1], pages[index_page], true) !== false) {
				index_page--;
			}
		}, next = function() {
			if (index_page < length_page - 1 && Mobilebone.transition(pages[index_page + 1], pages[index_page]) !== false) {
				index_page++;
			}	
		};
		
		/*document.addEventListener("click", function(event) {
			var target = event.target;
			if (target.tagName.toLowerCase() == "a" || target.getParentElementByTag("a")) return;
			next();
		});*/
		
		document.addEventListener("keyup", function(event) {
			switch (event.keyCode) {
				case 38: case 37: {
					prev();
					break;	
				}
				case 39: case 40: {
					next();
					break;	
				}
			}
		});
		
		document.addEventListener("mousewheel", function(event) {
			if (event.wheelDelta > 0) {
				prev();
			} else {
				next();
			}
		});
		document.addEventListener("DOMMouseScroll", function(event) {
			if (event.detail > 0) {
				next();
			} else {
				prev();
			}
		});
		
		
		Mobilebone.preventdefault = function(pagein, pageout) {
			if (pageout == null) return;
			var isBack = Mobilebone.isBack(pagein, pageout);
			if (isBack == true) {
				var elein = pageout.querySelector(".in");
				if (elein) {
					elein.style.display = "block";
					elein.classList.remove("in");
					elein.classList.add("out");
					return true;
				}
			} else {
				var eleout = pageout.querySelector(".out");
				
				if (eleout) {
					eleout.classList.remove("out");
					eleout.classList.add("in");
					return true;
				}
			}
		};
		
	})(window, document);
}