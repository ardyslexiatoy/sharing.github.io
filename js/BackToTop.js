$(document).ready(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.scroll-top').fadeIn();
		} else {
			$('.scroll-top').fadeOut();
		}
	});

	$('.scroll-top').click(function () {
		$("html, body").animate({
			scrollTop: 0
			}, 300);
		return false;
	});

});