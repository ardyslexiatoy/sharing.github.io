var pwType, confirmPwType;

function PwToggle() {
	pwType = document.getElementById("password");
	confirmPwType = document.getElementById("confirm-password");
	
	// pw
	if (pwType.type === "password") {
		pwType.type = "text";
		$("#pw-tpggle-btn").addClass("fa-eye-slash");
		$("#pw-tpggle-btn").removeClass("fa-eye");
	} else {
		pwType.type = "password";
		$("#pw-tpggle-btn").addClass("fa-eye");
		$("#pw-tpggle-btn").removeClass("fa-eye-slash");
	}

	// confirm pw
	if (confirmPwType.type === "password") {
		confirmPwType.type = "text";
		$("#confirm-pw-tpggle-btn").addClass("fa-eye-slash");
		$("#confirm-pw-tpggle-btn").removeClass("fa-eye");
	} else {
		confirmPwType.type = "password";
		$("#confirm-pw-tpggle-btn").addClass("fa-eye");
		$("#confirm-pw-tpggle-btn").removeClass("fa-eye-slash");
	}
}