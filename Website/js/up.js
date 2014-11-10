jQuery(function ($) {
	var top = $('.top');
	window.addEventListener("scroll",function() {
		//console.log(window.scrollY); 
		if(window.scrollY > 500) {
			top.css('display', 'block');
			//top.animate({'opacity':1}, 250);
			//console.log('a');
		}
		else {
			top.css('display', 'none');
			//top.animate({'opacity':0}, 250);
			//console.log('b');
		}
	},false);
});