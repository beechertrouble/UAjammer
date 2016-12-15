$(document).ready(function() {
	
	console.log(_UAjammer);
	
	$('.main_wrap').append('<div><h3>Raw : </h3><p>' + _UAjammer.Raw + '</p></div>');
	$('.main_wrap').append('<div><h3>Classes : </h3><p>' + _UAjammer.ClassString.replace(/\s/g, ', ') + '</p></div>');
	$('.main_wrap').append('<div><h3>Venue : <span>' + _UAjammer.Venue + '</span> &bull; Device : <span>' + _UAjammer.Device + '</span></h3></div>');
	$('.main_wrap').append('<div><h3>OS : <span>' + _UAjammer.OS + '</span> &bull; OS version : <span>' + _UAjammer.OSv + '</span></h3></div>');
	$('.main_wrap').append('<div><h3>Browser Name : <span>' + _UAjammer.Browser.Name + '</span> &bull; Browser Version : <span>' + _UAjammer.Browser.Version + '</span></h3></div>');
	$('.main_wrap').append('<div><h3>Mobile : <span>' + (_UAjammer.Mobile ? 'yarp' : 'narp') + '</span> &bull; Touch : <span>' + (_UAjammer.Touch ? 'yarp' : 'narp') + '</span></h3></div>');
	$('.main_wrap').append('<div><h3>Pixels : <span>' + _UAjammer.Pixels + '</span></h3></div>');
	
});
