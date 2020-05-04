var turl;

var query = { active: true, currentWindow: true };
  function callback(tabs) {
	var currentTab = tabs[0]; // there will be only one in this array
	turl = currentTab.url;
    console.log(currentTab.url); // also has properties like currentTab.id
  }
  chrome.tabs.query(query, callback);

function reportHandler(e) {
	e.preventDefault();
	// Clicked report button
	fetch("https://fatcher-back.herokuapp.com/report", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: {
			url: turl,
		},
	})
		.then((response) => {
			console.log(response);
			updateReportCount();
		})
		.catch((err) => {
			console.log(err);
		});
}

function updateReportCount() {
	fetch("https://fatcher-back.herokuapp.com/stats", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: {
			url: turl,
		},
	})
		.then((response) => {
			document.querySelector("#numReports").textContent = response.reports;
		})
		.catch((err) => {
			console.log(err);
		});
}

document.addEventListener("DOMContentLoaded", function () {
	document
		.querySelector("#reportPage")
		.addEventListener("click", reportHandler);
	updateReportCount();
});
