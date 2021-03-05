var checkbox = document.getElementById("nav-check");

$(".nav-link").click(function() {
	checkbox.checked = false;
});

// function NavController() {
// 	var checkbox = document.getElementById("nav-check");

// 	if (checkbox.checked == true) {
// 		// $('.nav-links').css("display", "block");
// 		$('.nav-links').fadeIn(1000);
// 	} else {
// 		$('.nav-links').fadeOut(1000);
// 	}
// }