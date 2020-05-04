
function awesome() {
  // Do something awesome!
	
	document.getElementById("demo").innerHTML = "1";
 

  var query = { active: true, currentWindow: true };
  function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    console.log(currentTab.url); // also has properties like currentTab.id
  }
  chrome.tabs.query(query, callback);
 
  
}

function totallyAwesome() {
  // do something TOTALLY awesome!
}

function awesomeTask() {
  awesome();
  totallyAwesome();
}

function clickHandler(e) {
  setTimeout(awesomeTask, 1000);
}

function main() {
  // Initialization work goes here.
 
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});