/*
 * mobilebone.js
 * by zhangxinxu(.com) 2014-09-26
 * https://github.com/zhangxinxu/mobilebone
 * bone of slide for mobile web app 
**/

(function(root, factory) {
	// Set up Mobilebone appropriately for the environment.
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define('mobilebone', function(exports) {
			return factory(root, exports);
		});
	// Finally, as a browser global.
	} else {
		root.Mobilebone = factory(root, {});
	}
})(this, function(root, Mobilebone) {
	// Avoid repeated callbacks
	var store = {};
	
	// Create local references to array methods we'll want to use later.
	var array = [];
	var slice = array.slice;
	
	var supportHistory = "pushState" in history &&
		"replaceState" in history &&
		// When running inside a FF iframe, calling replaceState causes an error
		!( window.navigator.userAgent.indexOf( "Firefox" ) >= 0 && window.top !== window ) &&
		( window.navigator.userAgent.search(/CriOS/) === -1 );
	
	// similar to $().prop() method, but with a diff rule
	var prop = function(element, attribute) {
		var attr = element.getAttribute(attribute);
		if (attr == null || attr == "false" || attr == "0") return false;
		return true;
	};

	// Current version of the library. Keep in sync with `package.json`.
	Mobilebone.VERSION = '0.0.0';
	
	// if bind events when dom ready
	// if the value is false, u should use 'Mobilebone.init();' to initialize.
	Mobilebone.autoInit = true;
	
	// if catch attribute of href from tag 'a'
	// if the value set to false, jump links in a refresh form(not slide)
	Mobilebone.captureLink = true;
	
	// the root of callback function name
	Mobilebone.rootTransition = root;
	
	// name of page class
	Mobilebone.classPage = "page";
	
	// if url that changed follow history
	Mobilebone.pushStateEnabled = true;
	
	// main function for transition
	Mobilebone.transition = function(pageInto, pageOut, back, options) {
		if (arguments.length == 0) return;
		if (arguments.length == 3 && isNaN(back * 1) == true) {
			options = back;
			back = false;
		};
		//if those parameters is missing
		pageOut = pageOut || null, back = back || false, options = options || {};
		
		// defaults parameters
		var defaults = {
			// the value of callback is a key name, and the host is root here. 
			// eg. if the name of animationstart is 'doLoading', so the script will execute 'root.doLoading()'
			// By default, the value of root is 'window'
			root: this.rootTransition,
			// the form of transition, the value (eg. 'slide') will be a className to add or remove. 
			// of course, u can set to other valeu, for example, 'fade' or 'flip'. However, u shou add corresponding CSS3 code.
			form: 'slide',
			// 'animationstart/animationend/...' are callbacks params
			// Note: those all global callbacks!
			onpagefirstinto: this.onpagefirstinto,
			animationstart: this.animationstart,
			animationend: this.animationend,
			callback: this.callback
		}, params = function(element) {
			var _params = {}, _dataparams = (element.getAttribute("data-params") || '').queryToObject();
			
			// rules as follow:
			// data-* > data-params > options > defaults	
			["title", "root", "form", "onpagefirstinto", "callback", "animationstart", "animationend"].forEach(function(key) {
				_params[key] = element.getAttribute("data-" + key) || _dataparams[key] || options[key] || defaults[key];
			});
			
			if (typeof _params.root == "string") {
				_params.root = root[_params.root];
			}
			
			return _params;
		};
		
		if (pageOut != null && pageOut.classList) {
			var params_out = params(pageOut);
			// do transition
			pageOut.classList.add("out");
			pageOut.classList.add(params_out.form);
			pageOut.classList.remove("in");
			// if reverse direction
			pageOut.classList[back? "add": "remove"]("back");
			
		}
		if (pageInto != null && pageInto.classList) {
			var params_in = params(pageInto);
			
			// for title change
			var title = params_in.title, header = document.querySelector("h1");			
			// do title change	
			if (title) {
				document.title = title;
				if (header) {
					header.innerHTML = title;
					header.title = title;
				}
			}
			
			// delete page with same id
			var pageid = options.id || pageInto.id;

			if (store[pageid] && store[pageid] != pageInto) {
				store[pageid].parentElement.removeChild(store[pageid]);
				delete store[pageid];
			}
	
			// do transition
			pageInto.classList.remove("out");
			pageInto.classList.add("in");
			pageOut && pageInto.classList.add(params_in.form);
			// if reverse direction
			pageInto.classList[back? "add": "remove"]("back");
			
			// do callback when come in first time
			var onpagefirstinto = params_in.onpagefirstinto;
			if (typeof onpagefirstinto == "string") onpagefirstinto = params_in.root[onpagefirstinto];
			if (!store[pageid] && typeof onpagefirstinto == "function") {
				onpagefirstinto(pageInto, pageOut, options.response);
			}
			
			// do callback when animation start/end
			var isWebkit = typeof document.webkitHidden != "undefined";
			["animationstart", "animationend"].forEach(function(animationkey, index) {
				var animition = params_in[animationkey], webkitkey = "webkit" + animationkey.replace(/^a|s|e/g, function(matchs) {
					return matchs.toUpperCase();
				});
				
				if (typeof animition == "string") animition = params_in.root[animition];
				
				if (!store[pageid] && typeof animition == "function") {
					pageInto.addEventListener(isWebkit? webkitkey: animationkey, function() {
						animition(this, this.classList.contains("in")? "into": "out");	
					});
				}	
			});
			
			// history
			var url_push = pageid;
			if (url_push && /^#/.test(url_push) == false) {
				url_push = "#" + url_push;
			}
			if (supportHistory && this.pushStateEnabled && options.history !== false && url_push) {
				history[pageOut? "pushState": "replaceState"](null, document.title, url_push);
			}

			// store page-id, just once
			if (!store[pageid]) {
				store[pageid] = pageInto;
			}
			
			// do callback every time
			var callback = params_in.callback;
			if (typeof callback == "string") callback = params_in.root[callback];
			if (typeof callback == "function") callback(pageInto, pageOut, options.response);
		}
	};
	
	Mobilebone.getCleanUrl = function(trigger, url, params) {
		var href = "", formdata = "", clean_url = "";
		if (trigger) {
			 if (trigger.nodeType == 1) {
				href = trigger.getAttribute("href");
				formdata = trigger.getAttribute("data-formdata") || trigger.getAttribute("data-data");
			 } else if (trigger.url) {
				 href = trigger.url;
				 formdata = trigger.data;
			 }
		}

		if (!(href = href || url)) return '';
		
		// get formdata
		formdata = formdata || params || "";
		
		if (typeof formdata == "object") {
			var arr_data = [];
			for (key in params) {
				arr_data.push(key + "=" + encodeURIComponent(params[key]));	
			}
			if (arr_data.length > 0) {
				formdata = arr_data.join("&");
			} else {
				formdata = "";
			}
		}
		
		// get url of root
		clean_url = href.split("#")[0].replace(/&+$/, "");

		if (clean_url.slice(-1) == "?") {
			clean_url = clean_url.split("?")[0];	
		}
		// url = root_url + joiner + formdata
		if (formdata != "") {						
			if (/\?/.test(clean_url)) {
				formdata = formdata.replace(/^&|\?/, "");
				clean_url = clean_url + "&" + formdata;
			} else if (formdata != "") {
				formdata = formdata.replace("?", "");
				clean_url = clean_url + "?" + formdata;
			}
		}
		
		return clean_url;
	};
	
	Mobilebone.getPage = function(children) {
		var _page = null;
		slice.call(document.querySelectorAll("." + this.classPage)).forEach(function(page) {
			if (_page == null && page.contains(children)) {
				_page = page;
			}
		});	
		return _page;
	};
	
	Mobilebone.createPage = function(dom_or_html, element_or_options, options) {
		var response = null;
		// 'element_or_options' can '.page element', or 'a element', or 'options'
		// basically, options = ajax options, of course, u can custom it!		
		if (!dom_or_html) return;
		options = options || {};
		// get current page(will be out) according to 'page_or_child'
		var current_page = document.querySelector(".in." + this.classPage);

		if (element_or_options) {
			if (element_or_options.nodeType == 1) {
				// legal elements
				if (element_or_options.classList.contains(this.classPage)) {
					current_page = element_or_options;
				} else if (element_or_options.href) {
					current_page = this.getPage(element_or_options);
				}
				response = options.response;
			} else {
				response = element_or_options.response || options.response;	
			}
		}
		
		// get create page (will be into) according to 'dom_or_html'
		var create_page = null;
		
		var create = document.createElement("div");
		if (typeof dom_or_html == "string") {
			create.innerHTML = dom_or_html;
		} else {
			create.appendChild(dom_or_html);
		}
		// get the page element
		if (!(create_page = create.querySelector("." + this.classPage))) {
			create.className = "page out";
			create_page = create;
		} 
		// insert create page as a last-child
		document.body.appendChild(create_page);
		
		// release memory
		create = null;
		
		// do transition
		this.transition(create_page, current_page, {
			response: response || dom_or_html,
			id: this.getCleanUrl(element_or_options) || create_page.id || ("unique" + Date.now())
		});
	};
	
	Mobilebone.getFunction = function(keys) {
		if (typeof keys != "string") return;
		// eg. 'globalObject.functionName'
		var fun = root, arr_key = keys.split(".");
		for (var index=0; index<arr_key.length; index+=1) {
			if (!(fun = fun[arr_key[index]])) {
				break;
			}
		}
		return fun;
	};
	
	Mobilebone.ajax = function(trigger_or_options) {
		if (!trigger_or_options) return;
		
		// default params
		var defaults = {
			url: "",
			dataType: "",
			data: {},
			timeout: 10000,
			async: true,
			username: "",
			password: "",
			success: function() {},
			error: function() {},
			complete: function() {}	
		};
		
		var params = {};
		
		// if 'trigger_or_options' is a element, we should turn it to options-object
		var params_from_trigger = {};
		if (trigger_or_options.nodeType == 1) {
			params_from_trigger = (trigger_or_options.getAttribute("data-params") || "").queryToObject();
			// get params
			for (key in defaults) {
				// data-* > data-params > defaults
				params[key] = trigger_or_options.getAttribute("data-" + key) || params_from_trigger[key] || defaults[key];
				if (typeof defaults[key] == "function" && typeof params[key] == "string") {
					// eg. globalObject.functionName
					params[key] = this.getFunction(params[key]);
					if (typeof params[key] != "function") {
						params[key] = defaults[key];
					}
				}
				params.target = trigger_or_options;
			}
			
			// the ajax url is special, we need special treatment
			params.url = this.getCleanUrl(trigger_or_options, params.url);			
		}
		// if 'trigger_or_options' is a object
		else if (trigger_or_options.url) {
			// get params
			for (key2 in defaults) {
				params[key2] = trigger_or_options[key2] || defaults[key2];
			}
			// get url
			params.url = this.getCleanUrl(null, params.url, params.data);
		} else {
			return;	
		}
		
		// do ajax
		// show loading
		var ele_mask = document.querySelector("#ajaxMask");
		if (ele_mask) {
			ele_mask.style.display = "block";	
		} else {
			document.body.insertAdjacentHTML('beforeend', '\
				<div id="ajaxMask" class="mask"><i class="loading"></i></div>\
			');	
			ele_mask = document.querySelector("#ajaxMask");
		}
		
		// ajax request
		var xhr = new XMLHttpRequest();		
		xhr.open("GET", params.url + (/\?/.test(params.url)? "&" : "?") + "r=" + Date.now());
		xhr.timeout = params.timeout;
		
		xhr.onload = function() {
			// so far, many browser hasn't supported responseType = 'json', so, use JSON.parse instead
			var response = null;
			
			if (xhr.status == 200) {
				if (params.dataType == "json") {
					try {
						response = JSON.parse(xhr.response);
						params.response = response;
						Mobilebone.createPage(Mobilebone.jsonHandle(response), trigger_or_options, params);
					} catch (e) {
						params.message = "JSON解析出现错误：" + e.message;
						params.error.call(params, xhr, xhr.status);
					}
				} else if (params.dataType == "unknown") {
					try {
						// as json
						response = JSON.parse(xhr.response);
						params.response = response;
						Mobilebone.createPage(Mobilebone.jsonHandle(response), trigger_or_options, params);
					} catch (e) {
						// as html
						response = xhr.response;
						Mobilebone.createPage(response, trigger_or_options, params);
					}
				} else {
					response = xhr.response;
					// 'response' is string
					Mobilebone.createPage(response, trigger_or_options, params);
				}
				params.success.call(params, response, xhr.status);
			} else {
				params.error.call(params, xhr, xhr.status);
			}
			
			params.complete.call(params, xhr, xhr.status);
			
			// hide loading
			ele_mask.style.display = "none";
		}
		xhr.send(null);
	};
	
	Mobilebone.isBack = function(page_in, page_out) {
		// back or forword, according to the order of two pages
		var index_in = -1, index_out = -1;
		if (history.tempBack == true) {
			// backwords
			index_out = 0;
		} else {
			slice.call(document.querySelectorAll("." + Mobilebone.classPage)).forEach(function(page, index) {
				if (page == page_in) {
					index_in = index;
				} else if (page == page_out) {
					index_out = index;
				}
			});	
		}
		history.tempBack = null;
		return index_in < index_out;
	};
	
	Mobilebone.jsonHandle = function(json) {
		return '<p style="text-align:center;">主人，如果你看到我了，说明JSON解析函数未定义！</p>';
	},
	
	Mobilebone.init = function() {
		var hash = location.hash, ele_in = hash && document.querySelector(hash);
		if (hash == "") {
			this.transition(document.querySelector("." + this.classPage));
		} else if (ele_in == null || ele_in.classList.contains(this.classPage) == false/* not page */) {
			// as a ajax
			this.ajax({
				url: hash.replace("#", ""),
				dataType: "unknown",
				error: function() {
					ele_in = document.querySelector("." + Mobilebone.classPage);	
					Mobilebone.transition(ele_in);
				}
			});	
		} else {
			this.transition(ele_in);	
		}	
		
		this.captureLink == true && document.addEventListener("tap", this.handleTapEvent);	
	};
	
	// if 'a' element has href, slide auto when tapping~
	Mobilebone.handleTapEvent = function(event) {
		// get target and href
		var target = event.target || event.touches[0], href = target.href;
		if (!href && (target = target.getParentElementByTag("a"))) {
			href = target.href;
		}
		// the page that current touched or actived
		var self_page = document.querySelector(".in." + Mobilebone.classPage);
		
		if (self_page == null || !target) return;
		
		// if captureLink
		var capture = (Mobilebone.captureLink == true);
		// get rel
		var rel = target.getAttribute("data-rel");
		// if back
		var back = false;
		if (rel == "back") {
			back = true;
		}
		// if external link
		var external = (rel == "external");
		
		// if the 'href' is not legal, return
		// include:
		// 1. undefined
		// 2. javascript: (except data-rel="back")
		// 3. cros, or not capture (except data-ajax="true")
		if (!href) return;
		if (/^javascript/.test(href)) {
			if (back == false) return;	
		} else {
			external = external || (href.split("/")[0] !== location.href.split("/")[0]);
			if ((external == true || capture == false) && target.getAttribute("data-ajax") != "true") return;
		}
		
		// judge that if it's a ajax request
		if (/^#/.test(target.getAttribute("href")) == true) {
			// hash slide
			var idTargetPage = href.split("#")[1], eleTargetPage = idTargetPage && document.getElementById(idTargetPage);
			if (back == false && rel == "auto") {
				back = Mobilebone.isBack(eleTargetPage, self_page);
			}
			if (eleTargetPage) Mobilebone.transition(eleTargetPage, self_page, back);
			event.preventDefault();
		} else if (/^javascript/.test(href)) {
			// back
			history.tempBack = true;
			history.back();
		} else if (target.getAttribute("data-ajax") != "false") {				
			// get a clean ajax url as page id
			var clean_url = Mobilebone.getCleanUrl(target);
			
			// if has loaded and the value of 'data-reload' is not 'true'
			var attr_reload = target.getAttribute("data-reload"), id = target.getAttribute("href");
			if ((attr_reload == null || attr_reload == "false") && store[clean_url]) {
				if (back == false && rel == "auto") {
					back = Mobilebone.isBack(store[id], self_page);
				}
				Mobilebone.transition(store[id], self_page, back, {
					id: id	
				});
			} else {
				Mobilebone.ajax(target);
			}
			event.preventDefault();	
		}	
	};
	
	
	// some prototype extend methods
	Element.prototype.getParentElementByTag = function(tag) {
		if (!tag) return null;
		var element = null, parent = this;
		var popup = function() {
			parent = parent.parentElement;
			var tagParent = parent.tagName.toLowerCase();
			if (tagParent === tag) {
				element = parent;
			} else if (tagParent == "body") {
				element = null;
			} else {
				popup();
			}
		};
		popup();
		return element;
	};	
	String.prototype.queryToObject = function() {
		var obj = {};
		this.split("&").forEach(function(part) {
			var arr_part = part.split("=");
			if (arr_part.length > 1) {
				obj[arr_part[0]] = part.replace(arr_part[0] + "=", "");
			}
		});
		return obj;
	};
	
	
	window.addEventListener("DOMContentLoaded", function() {
		if (Mobilebone.autoInit == true) {
			Mobilebone.init();
		}
	});
	
	if (supportHistory) {
		window.addEventListener("popstate", function() {
			var hash = location.hash.replace("#", "");
			if (hash == "") return;
			
			var page_in = store[hash] || document.querySelector(location.hash), page_out = document.querySelector(".in." + Mobilebone.classPage);
			
			if (page_in && page_in == page_out) return;
			

			// hash ↔ id													
			if (store[hash] && Mobilebone.pushStateEnabled) {
				Mobilebone.transition(store[hash], document.querySelector(".in." + Mobilebone.classPage), Mobilebone.isBack(page_in, page_out), {
					history: false	
				});
			}
		});
	}
	
	// tap events
	// https://github.com/pukhalski/tap
	var Tap = {};

	var utils = {};

	utils.attachEvent = function( element, eventName, callback ) {
		return element.addEventListener( eventName, callback, false );
	};

	utils.fireFakeEvent = function( e, eventName ) {
		return e.target.dispatchEvent( utils.createEvent( eventName ) );
	};

	utils.createEvent = function( name ) {
		var evnt = window.document.createEvent( 'HTMLEvents' );
		evnt.initEvent( name, true, true );
		evnt.eventName = name;

		return evnt;
	};

	utils.getRealEvent = function( e ) {
		return e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[ 0 ] : e;
	};

	var eventMatrix = [{
		// Touchable devices
		test: ( 'propertyIsEnumerable' in window || 'hasOwnProperty' in document ) && ( window.propertyIsEnumerable( 'ontouchstart' ) || "ontouchstart" in document ),
		events: {
			start: 'touchstart',
			move: 'touchmove',
			end: 'touchend'
		}
	}, {
		// IE10
		test: window.navigator.msPointerEnabled,
		events: {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		}
	}, {
		// Modern device agnostic web
		test: window.navigator.pointerEnabled,
		events: {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		}
	}];

	Tap.options = {
		eventName: 'tap',
		fingerMaxOffset: 11
	};

	var attachDeviceEvent, init, handlers, deviceEvents,
		coords = {};

	attachDeviceEvent = function( eventName ) {
		return utils.attachEvent( document.body, deviceEvents[ eventName ], handlers[ eventName ] );
	};

	handlers = {
		start: function( e ) {
			e = utils.getRealEvent( e );
			coords.start = [ e.layerX, e.pageY ];
			coords.offset = [ 0, 0 ];
		},

		move: function( e ) {
			if (!coords['start'] && !coords['move']) return false;
			
			e = utils.getRealEvent( e );

			coords.move = [ e.pageX, e.pageY ];
			coords.offset = [
				Math.abs( coords.move[ 0 ] - coords.start[ 0 ] ),
				Math.abs( coords.move[ 1 ] - coords.start[ 1 ] )
			];
		},

		end: function( e ) {
			e = utils.getRealEvent( e );

			if ( coords.offset[ 0 ] < Tap.options.fingerMaxOffset && coords.offset[ 1 ] < Tap.options.fingerMaxOffset && !utils.fireFakeEvent( e, Tap.options.eventName ) ) {
				e.preventDefault();
			}

			coords = {};
		},

		click: function( e ) {
			if ( !utils.fireFakeEvent( e, Tap.options.eventName ) ) {
				return e.preventDefault();
			}
		}
	};

	init = function() {
		var i = eventMatrix.length;

		while ( i-- ) {
			if ( eventMatrix[ i ].test ) {
				deviceEvents = eventMatrix[ i ].events;

				attachDeviceEvent( 'start' );
				attachDeviceEvent( 'move' );
				attachDeviceEvent( 'end' );

				return false;
			}
		}
		

		return utils.attachEvent( document.body, 'click', handlers[ 'click' ] );
	};

	utils.attachEvent( root, 'load', init );

	root.Tap = Tap;
	
	
	return Mobilebone;
});
