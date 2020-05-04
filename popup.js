function reportHandler(e) {
	e.preventDefault();
	// Clicked report button
	fetch("https://fatcher-back.herokuapp.com/report", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: {
			url: window.location.href,
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
			url: window.location.href,
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
