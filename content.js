var logged_in_user = "";

chrome.extension.sendMessage({}, function (response) {
    logged_in_user = response.email
});
console.log("Got user:", logged_in_user);
