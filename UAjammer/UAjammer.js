/**
* UAjammer
* v2.0.0
* 2016-12-15 02:24:01 PM 
*/ 

;(function() {

	'use strict';

	/**
	 * for AMD, don't redefine this!  (need to maintain globals and plugins)
	 */
	if (window._UAjammer)
		return;
		
	var _UAjammer = (function(){
	
		var UA = {},
			W = window,
			defs = W._uajArgs === undefined ? {} : W._uajArgs,
			immediately = defs.immediately === undefined ? true : defs.immediately,
			addClasses = defs.addClasses === undefined ? true : defs.addClasses,
			ns = defs.nameSpace || '_ua',
			//
			browsers = ["Edge/", "Firefox/", "Chrome/", "Android ", "Safari/", "Opera/", "MSIE "],
			detectBrowser, detectMobile, detectOS, addHTMLClass, addClassTimer;
				
		UA.Raw = navigator.userAgent;
		UA.ClassString = "";
		UA.OS = 'other';
		UA.OSv = '';
		UA.Device = 'pc';
		UA.Venue = 'desktop'; // tablet, phone
		UA.Mobile = false;
		UA.Touch = !!('ontouchstart' in W) || !!('onmsgesturechange' in W);
		UA.Pixels = W.devicePixelRatio && W.devicePixelRatio >= 2 ? 2 : 1;
		UA.Browser = {
			Name : '',
			Version : '',
			VersionFull : ''
		};
		UA.Classes = [];
		UA.isLt = function(v) { return v.toString().indexOf('.') > 0 ? UA.Browser.VersionFull < v : UA.Browser.Version < v; };
		UA.isLte = function(v) { return v.toString().indexOf('.') > 0 ? UA.Browser.VersionFull <= v : UA.Browser.Version <= v; };
		UA.isGt = function(v) { return v.toString().indexOf('.') > 0 ? UA.Browser.VersionFull > v : UA.Browser.Version > v; };
		UA.isGte = function(v) { return v.toString().indexOf('.') > 0 ? UA.Browser.VersionFull >= v : UA.Browser.Version >= v; };
			
		//
		UA.init = function() {
		
			detectBrowser();
			detectMobile();
			detectOS();
			
			UA.Classes.push('device_' + UA.Device);
			UA.Classes.push('venue_' + UA.Venue);
			UA.Classes.push('browser_' + UA.Browser.Name);
			UA.Classes.push('browser_' + UA.Browser.Name + '_' + UA.Browser.Version);
			UA.Classes.push(UA.Mobile ? 'mobile' : 'not_mobile');
			if(UA.Raw.match(/webkit/i))
				UA.Classes.push('webkit');
			UA.Classes.push('os_' + UA.OS);
			UA.Classes.push('os_' + UA.OS + '_' + UA.OSv);
			UA.Classes.push('pixels_' + UA.Pixels);
				
			UA.ClassString = ns + '_' + UA.Classes.join(' ' + ns + '_');
			
			if(addClasses)				
				addHTMLClass();
					
		};
		//
		detectBrowser = function() {
			
			var foundB = false;
					
			for(var i=0; i<browsers.length; i++) {
				
				var b = browsers[i], b_len, start, end, v;
				
				if(UA.Raw.indexOf(b) != -1) {
					
					foundB = true;
					b_len = b.length;
					start = UA.Raw.indexOf('Version') != -1 ? UA.Raw.indexOf('Version') + 7 : UA.Raw.indexOf(b) + b_len; 
					end = UA.Raw.length - start;
					v = UA.Raw.substr(start, end);
					v = v.indexOf(" ") != -1 ? v.substr(0, v.indexOf(" ")) : v;
					v = v.replace(/[^0-9\.]/, "");
					
					UA.Browser.Name = b.substr(0, (b_len -1)).toLowerCase();
					UA.Browser.Version = parseInt(v);
					UA.Browser.VersionFull = parseFloat(v);
					
					break;
				}
			}
			
			if(!(window.ActiveXObject) && "ActiveXObject" in window) {
				
				UA.Browser.Name = 'msie';
				UA.Browser.Version = 11;
				UA.Browser.VersionFull = 11;
				foundB = true;
				
			} else if(!foundB && UA.Raw.indexOf("Trident/") != -1) {
				
				UA.Browser.Name = 'msie';
				UA.Browser.Version = 10;
				UA.Browser.VersionFull = 10;
				foundB = true;
				
			}
			
		};
		//
		detectMobile = function() {
			
			switch(true) {
				
				case(UA.Raw.match(/iPhone/i) && UA.Raw.match(/iPhone/i).length > 0):
					UA.Device = "iphone";
					UA.Venue = "phone";
					UA.Mobile = true;
					break;
					
				case(UA.Raw.match(/iPad/i) && UA.Raw.match(/iPad/i).length > 0):
					UA.Device = "ipad";
					UA.Venue = "tablet";
					UA.Mobile = true;
					break;
				
				case((UA.Raw.match(/android/i) && UA.Raw.match(/android/i).length > 0) && (UA.Raw.match(/mobile/i) && UA.Raw.match(/mobile/i).length > 0)):
					UA.Device = "android";
					UA.Venue = "phone";
					UA.Mobile = true;
					break;
					
				case(UA.Raw.match(/android/i) && UA.Raw.match(/android/i).length > 0):
					UA.Device = "android";
					UA.Venue = "tablet";
					UA.Mobile = false;
					break;
					
				case((UA.Raw.match(/avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i) && UA.Raw.match(/avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i).length > 0)):
					UA.Device = "other_mobile";
					UA.Venue = "phone";
					UA.Mobile = true;
					break;	
				
			}
			
		};
		//
		detectOS = function() {
			
			var start, end;
					
			switch(true) {
				
				case(UA.Raw.match(/macintosh/i) && UA.Raw.match(/macintosh/i).length > 0):
					UA.OS = "OSX";
					start = UA.Raw.indexOf("OS X") + 5;
					end = UA.Raw.indexOf(" ", start) - start;
					UA.OSv = UA.Raw.substr(start, end).replace(/[^0-9\.\_]/, "").replace(/\_/g, ".");
					break;
					
				case(UA.Raw.match(/windows/i) && UA.Raw.match(/windows/i).length > 0):
					UA.OS = "windows";
					start = UA.Raw.indexOf(UA.Raw.match(/windows/i)) + 8;
					end = UA.Raw.indexOf(";", start) - start;
					UA.OSv = UA.Raw.substr(start, end).replace(/\_/g, ".");
					break;
					
				case((UA.Raw.match(/linux/i) && UA.Raw.match(/linux/i).length > 0) && (UA.Raw.match(/Android/i) && UA.Raw.match(/Android/i).length > 0)):
					UA.OS = "android";
					break;
					
				case(UA.Raw.match(/linux/i) && UA.Raw.match(/linux/i).length > 0):
					UA.OS = "linux";
					break;
					
				case(UA.Raw.match(/\sOS\s/) && UA.Raw.match(/\sOS\s/).length > 0):
					UA.OS = "iOS";
					start = UA.Raw.indexOf("OS") + 3;
					end = UA.Raw.indexOf(" ", start) - start;
					UA.OSv = UA.Raw.substr(start, end).replace(/\_/g, ".");
					break;
				
			}
				
		};
		//
		addHTMLClass = function() {
			if(document.documentElement) {
				clearTimeout(addClassTimer);
				document.documentElement.className += " " + UA.ClassString;
			} else { 
				addClassTimer = setTimeout(addHTMLClass, 60);
			}
		};				
			
		if(immediately)
			UA.init();
		
		return UA;
		
	}());
	
	window._UAjammer = _UAjammer;
	
	/**
	 * Expose fingaFingaz as an AMD
	 */
	if (typeof define === "function") {
		define("_UAjammer", [], function () { return _UAjammer; } );
	} 

})();