function OpenLang() {
	$('.lang').slideDown(500);
	$('.lang-cancel').fadeIn(500);
}

function CloseLang() {
    $('.lang').slideUp(500);
	$('.lang-cancel').fadeOut(500);
}

var isUserRedirectlang = false;
function RedirectLang() {
	isUserRedirectlang = true;
	// alert("User redirected to chinese");
	// var userLang = navigator.language;
	// if (!userLang.includes('zh')) {
	// 			window.location.replace('/index.html');
	// }
}