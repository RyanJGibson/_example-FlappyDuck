define(function (require) {
	var HandleCookie = {};
 
	HandleCookie.CreateCookie = function(name,value,days) {
		console.log("CreateCookie: " + name + " " + value);
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};
	
	
	HandleCookie.ReadCookie = function(name) {
		console.log("ReadCookie: " + name);
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			console.log(i);
			var c = ca[i];
			console.log(c);
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	
	HandleCookie.EraseCookie = function (name) {
		this.CreateCookie(name,"",-1);
	};

    return HandleCookie;
});