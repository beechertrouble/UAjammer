/**
* v.1.0
*/
_UAjammer = new function(immediately) {
	
	var UA = this,
		browsers = ["Firefox/", "Chrome/", "Safari/", "Opera/", "MSIE "],
		mobileString, webkitString,
		detectBrowser, detectMobile, detectOS, addHTMLClass, addClassTimer;
			
	this.Raw = navigator.userAgent;
	this.ClassString = "";
	this.OS = 'other';
	this.Device = 'pc';
	this.Venue = 'desktop';
	this.Mobile = false;
	this.Touch = !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
	this.Pixels = 1;
	this.Browser = {
			Name : '',
			Version : '',
			VersionFull : ''
		};
		
	//
	this.init = function() {
	
		detectBrowser();
		detectMobile();
		detectOS();
		UA.Pixels = window.devicePixelRatio && window.devicePixelRatio >= 2 ? 2 : 1;
		mobileString = UA.Mobile ? '_ua_mobile' : '_ua_not-mobile';
		webkitString = UA.Raw.match(/webkit/i) ? '_ua_webkit' : '';
		UA.ClassString = '_ua_device_' + UA.Device
						+ " _ua_venue_" + UA.Venue 
						+ " _ua_browser_" + UA.Browser.Name 
						+ " _ua_browser_" + UA.Browser.Name + "_" + UA.Browser.Version 
						+ " " + webkitString 
						+ " " + mobileString 
						+ " _ua_os_" + UA.OS
						+ " _ua_pixels_" + UA.Pixels;	
						
		addHTMLClass();
				
	};
	//
	detectBrowser = function() {
				
		for(var i=0; i<browsers.length; i++) {
			
			var b = browsers[i], b_len, start, end, v;
			
			if(UA.Raw.indexOf(b) != -1) {
				
				b_len = b.length;
				start = UA.Raw.indexOf('Version') != -1 ? UA.Raw.indexOf('Version') + 7 : UA.Raw.indexOf(b) + b_len; 
				end = UA.Raw.length - start;
				v = UA.Raw.substr(start, end);
				v = v.indexOf(" ") != -1 ? v.substr(0, v.indexOf(" ")) : v;
				v = v.replace(/[^0-9\.]/, "");
				
				UA.Browser.Name = b.substr(0, (b_len -1)).toLowerCase();
				UA.Browser.Version = v.substr(0, (v.indexOf("."))) * 1;
				UA.VersionFull = v;
				break;
			}
			
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
			
			case((UA.Raw.match(/android/i) && UA.Raw.match(/android/i).length > 0 ) && (UA.Raw.match(/mobile/i) && UA.Raw.match(/mobile/i).length > 0)):
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
				
		switch(true) {
			
			case(UA.Raw.match(/macintosh/i) && UA.Raw.match(/macintosh/i).length > 0):
				UA.OS = "macintosh";
				break;
				
			case(UA.Raw.match(/windows/i) && UA.Raw.match(/windows/i).length > 0):
				UA.OS = "windows";
				break;
				
			case(UA.Raw.match(/linux/i) && UA.Raw.match(/linux/i).length > 0):
				UA.OS = "linux";
				break;
			
		}
			
	};
	//
	addHTMLClass = function() {
		if(document.documentElement) {
			clearTimeout(addClassTimer);
			document.documentElement.className += " " + UA.ClassString;
		} else { 
			addClassTimer = setTimeout(addHTMLClass, 10);
		}
	};				
	
	if(immediately === undefined || immediately)
		this.init();
	
	return this;
	
}();
