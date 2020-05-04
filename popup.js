var turl = "";

function reportHandler(e) {
	e.preventDefault();
	// Clicked report button
	fetch("http://localhost:3000/report", {
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
		})
		.catch((err) => {
			console.log(err);
		});
}

function updateReportCount() {
	fetch("http://localhost:3000/stats", {
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
			document.querySelector("#numReports").innerHTML = response.domainReports;
		})
		.catch((err) => {
			console.log(err);
		});
}

document.addEventListener("DOMContentLoaded", function () {
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, (tabs) => {
		var currentTab = tabs[0]; // there will be only one in this array
		turl = currentTab.url;
		console.log(turl); // also has properties like currentTab.id
		document.querySelector("#url").innerHTML = turl;

		document
			.querySelector("#reportPage")
			.addEventListener("click", reportHandler);
		updateReportCount();
	});
});
