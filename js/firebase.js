// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDPa-PvYNgQlhk_v46hqku5w0ka2Rk_s2Y",
    authDomain: "cardweb-7759c.firebaseapp.com",
    databaseURL: "https://cardweb-7759c.firebaseio.com",
    projectId: "cardweb-7759c",
    storageBucket: "cardweb-7759c.appspot.com",
    messagingSenderId: "374158070392",
    appId: "1:374158070392:web:9ff35deefe75200866938d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var email;
var pw;
var subscribed = false;
var firstChar;
var reloadIndex;
var gotoBlog;
var provider = new firebase.auth.GoogleAuthProvider();

var lang;
if (window.location.pathname === "/user_login.html" || window.location.pathname === "/user_create.html" || window.location.pathname === "/Reset_Pw.html" || window.location.pathname === "/vertification.html" || window.location.pathname === "/index.html" || window.location.pathname === "/" || window.location.pathname === "/#") {
	lang = "chin";
} else {
	lang = "eng";
}

window.onload = function() {
	GetUserSubscribe();
	GetCurrentUser();
	
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
				if (lang == "eng") {
					document.getElementById("acc-manager").innerHTML = "Log out";
				} else {
					document.getElementById("acc-manager").innerHTML = "登出";
				}
			
			console.log("Manager: user sigined in");
		} else {
			if (lang == "eng") {
				
				document.getElementById("acc-manager").innerHTML = "Log in";
			} else {
				document.getElementById("acc-manager").innerHTML = "登入";
			}
			console.log("Manager: no user sigined in");
		}
	});
}

function GetCurrentUser() {
	console.log("GetCurrentUser RUN!");
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			console.log("User is signed in.");
			
			var uEmail = user.email;
			var uid = user.uid;
			
			//document.getElementById("user").innerHTML = "Welcome " + uEmail;
			
			// Set the user first name character
			firstChar = uEmail.charAt(0).toUpperCase();
			document.getElementById("user-icon").innerHTML = firstChar;
			SetUserIconstyle();
			
			//alert(uEmail + " signed in");
		} else {
			// User is signed out.
			//document.getElementById("user").innerHTML = "Welcome";
			// Set the user first name character
			
		}
	});
}

function GetUserSubscribe() {
	console.log("GetUserSubscribe RUN!");
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var uEmail = user.email;
			var uid = user.uid;
			
			var path = "users/" + uid;
			var ref = firebase.database().ref(path);
			ref.on("value", function(snapshot) {
				subscribed = snapshot.val().isUserSubscribed;
				console.log("subscribed: " + subscribed);
				
				if (subscribed) {
					if (lang == "eng") {
						document.getElementById("subscribe").innerHTML = "Go To C.A.R.D. News";
						document.getElementById('popup-content').innerHTML = "Let's click the 'Go to C.A.R.D. News' button to get the latest news of technology!";
					} else {
						document.getElementById("subscribe").innerHTML = "前往IT人討論區";
						document.getElementById('popup-content').innerHTML = "訂閱我們以獲得最新科技資訊";
					}
					
					console.log("User Subscribed");
					//alert("User Subscribed");
				} else {
					if (window.location.pathname === "/user_login.html" || window.location.pathname === "/user_create.html" || window.location.pathname === "/Reset_Pw.html" || window.location.pathname === "/vertification.html" || window.location.pathname === "/index.html" || window.location.pathname === "/" || window.location.pathname === "/#") {
						document.getElementById("subscribe").innerHTML = "Subscribe";
						document.getElementById("continue-to-web").innerHTML = "Not Now";
						document.getElementById('popup-content').innerHTML = "Let's subscribe our web to get the latest news of us and access to the C.A.R.D. News!";
					} else {
						document.getElementById("subscribe").innerHTML = "訂閱我們";
						document.getElementById("continue-to-web").innerHTML = "暫時不訂閱";
						document.getElementById('popup-content').innerHTML = "訂閱我們以獲得最新科技資訊";
					}
					
					console.log("User Not subscribed");
					//alert("Please subscribe");
				}
			});
		} else {
			// User signed out
			//alert("Please sign in to subscribe");
		}
	});
}

// Sign up function
function SignUp() {
	console.log("Sign up function");
	email = document.getElementById("email");
	pw = document.getElementById("password");
	
	// Register a new user
	firebase.auth().createUserWithEmailAndPassword(email.value, pw.value).then(function(user) {
		// Sign up SUCCESS
		console.log("Sign up SUCCESS!");

		Vertification();
		
		// OpenPopup();

	}).catch(function(error) {
		alert(error);
		//alert("Sign up FAIL!");
	});
}

// Sign in function
function SignIn() {
	console.log("Sign in function");
	email = document.getElementById("email");
	pw = document.getElementById("password");
	
	firebase.auth().signInWithEmailAndPassword(email.value, pw.value).then(function(user) {
		// Sign in success
		console.log("Sign in SUCCESS");
		OpenPopup();
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorMessage);
		console.log(errorCode);
		//alert("Sign in FAIL!");
	});
}

// Sign out function
function SignOut() {
	console.log("Sign out function");
	
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		//alert("Sign out SUCCESS!");
		
		//location.reload();
		window.location.href = "index.html";
	}).catch(function(error) {
		// An error happened.
		//alert(error);
	});
}

function Subscribe() {
//	GetUserSubscribe();
	console.log("Subscribe button CLICKED");
	subscribed = !subscribed;
	console.log("isUserSubscribed: " + subscribed);
	PostData();
	if (!gotoBlog) {
		window.location.href = "index.html";
	} else {
		window.open("http://cardnews.ardyslexiatoy.com");
	}
}

function PostData() {
	var user = firebase.auth().currentUser;
	var userID = user.uid;
	var userEmail = user.email;
	// var userEmailVerified = user.emailVerified;
	
	firebase.database().ref("users").child(userID).set({
		email: userEmail,
		isUserSubscribed: subscribed
	}, function(error) {
		if (error) {
			// The write failed...
			console.log("User profile update FAIL!");
		} else {
			// Data saved successfully!
			console.log("User profile update SUCCESS!");
		}
	});
}

function SetUserIconstyle() {
	document.getElementById("user-icon").classList.remove("fa-user");
	document.getElementById("user-icon").style.backgroundColor = "#0476D0";
}

function UserAccEvent() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			reloadIndex = true;
			SignOut();
			//alert("User signed in");
		} else {
			if (!reloadIndex) {
				window.location.href = "user_login.html";
			}
		}
	});
}

//popup div
function OpenPopup() {
   $('.popup-div').fadeIn(250);
	reloadIndex = true;
	console.log(subscribed);
}

function ClosePopup() {
    $('.popup-div').fadeOut(250);
}

function PopupSubscribe() {
	if (subscribed) {
		window.open("http://cardnews.ardyslexiatoy.com");
	} else {
		Subscribe();
	}
}

function ContinueToWeb() {
	window.location.href = "index.html";
}

function GotoBlog() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			if (subscribed) {
				console.log(subscribed);
				window.open("http://cardnews.ardyslexiatoy.com");
			} else {
				OpenPopup();
				gotoBlog = true;
			}
		} else {
			window.location.href = "user_login.html";
		}
	});
}

function ResetPw() {
	var auth = firebase.auth();
	var emailAddress = document.getElementById("email").value;

	auth.sendPasswordResetEmail(emailAddress).then(function() {
	  // Email sent.
	  alert("We just sent you an updated password link. If you don't see it in your indox, remember to check your spam folder.");
	  window.location.href = "user_login.html";
	}).catch(function(error) {
	  // An error happened.
	  alert("error occur");
	});
}

function Vertification() {
	// Eamil vertify for new user
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  // Email sent.
	}).catch(function(error) {
	  // An error happened.
	});
	
	InitUser();
}

// Initiallize user data in databse
function InitUser() {
	var user = firebase.auth().currentUser;
	var userID = user.uid;
	var userEmail = user.email;
	// var userEmailVerified = user.emailVerified;
	subscribed = false;
	
	firebase.database().ref("users").child(userID).set({
		email: userEmail,
		isUserSubscribed: subscribed
	}, function(error) {
		if (error) {
			// The write failed...
			alert("User profile initiallize FAIL!");
		} else {
			// Data saved successfully!
			console.log("User profile initiallize SUCCESS!");
			window.location.href = "Vertification.html";
		}
	});
}

function ResendVertificationEmail() {
	Vertification();
	alert("Vertification email has resent to you, please check your mail box");
}

function ConfirmVertification() {
	window.location.href = "index.html";
}

function CheckPw() {
	var checkPw = document.getElementById("password");
	var checkConfirmPw = document.getElementById("confirm-password");

	if (checkPw.value == checkConfirmPw.value) {
		SignUp();
	} else {
		alert("Confirm password incorrect");
		checkConfirmPw.value = "";
	}
}