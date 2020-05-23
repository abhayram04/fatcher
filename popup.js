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
      document.getElementById("reportPage").innerHTML = "REPORTED";
    })
    .catch((err) => {
      console.log(err);
    });
}

function relog() {
  chrome.identity.getAuthToken(
    {
      interactive: true,
    },
    function (token) {
      if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
      }

      var x = new XMLHttpRequest();
      x.open(
        "GET",
        "https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=" +
          token
      );
      x.onload = function () {
        var user_info = JSON.parse(x.response);
        console.log(user_info.email);
        var email = user_info.email;

        document.getElementById("overr").innerHTML =
          "You are now logged in: " + email;
        if (!email) {
          document.getElementById("overr").innerHTML =
            "<button id='tag'>Login</button>";
        }
      };
      x.send();
    }
  );
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
  var query = { active: true, currentWindow: true };
  relog();
  //Code to get email from logged-in Chrome profile
  //chrome.identity.getProfileUserInfo(function (userInfo) {
  //	ulog = userInfo.email;
  //	console.log(ulog);
  //});

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
    document.querySelector("#tag").addEventListener("click", relog);
    updateReportCount();
  });
});
