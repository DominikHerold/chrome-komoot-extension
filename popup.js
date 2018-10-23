//chrome.tabs.query({
//    active: true,
//    lastFocusedWindow: true
//}, function (tabs) {
//    // and use that tab to fill in out title and url
//    var tab = tabs[0];
//    console.log(tab);
//    alert(tab.url);
//});
//chrome.runtime.onMessage.addListener(function (request, sender) {
//    if (request.action == "getSource") {
//        message.innerText = request.source;
//    }
//});