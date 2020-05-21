var turl = "";
var ulog = "";

function reportHandler(e) {
	// Clicked report button
	fetch("https://fatcher-back.herokuapp.com/report", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			url: turl,
		}),
	})


		.then((res) => res.json())

		.then((response) => {
			console.log(response);
			updateReportCount();
			document.getElementById("reportPage").innerHTML = "REPORTED"
		})
		.catch((err) => {
			console.log(err);
		});
}
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();

	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
function relog() {
	ui.start('#firebaseui-auth-container', {
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		// Other config options...
	});
}

function updateReportCount() {
	fetch("https://fatcher-back.herokuapp.com/stats", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			url: turl,
		}),
	})
		.then((res) => res.json())
		.then((response) => {
			console.log(response);
			document.querySelector("#numReports").innerHTML = response.domainReports;
			document.querySelector("#pageReports").innerHTML = response.pathReports;
			response.pathReports.length;
		})
		.catch((err) => {
			console.log(err);
		});
}

document.addEventListener("DOMContentLoaded", function () {
	var firebaseConfig = {
		apiKey: "AIzaSyCxu5GJylCEFUBohUMO5PRYP6mYBQvm7Fo",
		authDomain: "fatcher-sa.firebaseapp.com",
		databaseURL: "https://fatcher-sa.firebaseio.com",
		projectId: "fatcher-sa",
		storageBucket: "fatcher-sa.appspot.com",
		messagingSenderId: "515487735728",
		appId: "1:515487735728:web:59d3f0efc5533e0b920075",
		measurementId: "G-N4MLM1WWHH"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	var ui = new firebaseui.auth.AuthUI(firebase.auth());

	var query = { active: true, currentWindow: true };
	chrome.identity.getProfileUserInfo(function (userInfo) {
		ulog = userInfo.email;
		console.log(ulog);
	});

	chrome.tabs.query(query, (tabs) => {
		var currentTab = tabs[0]; // there will be only one in this array
		turl = currentTab.url;
		tit = currentTab.title;
		document.querySelector("#ctit").innerHTML = tit;
		console.log(turl); // also has properties like currentTab.id
		document.querySelector("#url").innerHTML = turl;

		document
			.querySelector("#reportPage")
			.addEventListener("click", reportHandler);
		document
			.querySelector("#tag")
			.addEventListener("click", relog);
		updateReportCount();
	});
});
