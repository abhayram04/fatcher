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
      user: ulog,
    }),
  })
    .then((res) => res.json())

    .then((response) => {
      console.log(response);
      updateReportCount();
      document.getElementById("reportPage").innerHTML = "REPORTED";
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
    body: JSON.stringify({
      url: turl,
      user: ulog,
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
  var query = { active: true, currentWindow: true };

  //Code to get email from logged-in Chrome profile
  chrome.identity.getProfileUserInfo(function (userInfo) {
    ulog = userInfo.email;
    console.log(ulog);
    if (ulog) {
      document.getElementById("overr").innerHTML =
        "You are logged in: <br> " + ulog;
    } else {
      document.getElementById("overr").innerHTML =
        "You must be logged into chrome!";
    }
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
    updateReportCount();
  });
});
