// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('youtube.com/watch?v=') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
  else if (tab.url.indexOf('twitch.tv/') > -1) {
    chrome.pageAction.show(tabId);
  };
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.pageAction.onClicked.addListener(function(tab){
  //var thisTab = tab.url;

  if (tab.url.indexOf("youtube") != -1) {
    var string = tab.url.split("v=");
    var embedded = "https://www.youtube.com/embed/" + string[1];
    //Reload current tab with embedded URL
    //chrome.tabs.update(tab.id, {url: embedded});
    //Close current tab
    chrome.tabs.remove(tab.id);
    //Open embedded URL in a panel
    chrome.windows.create({url: embedded, type: "panel", height: 376, width: 600});
  }
  else if (tab.url.indexOf("twitch") != -1) {
    var string = tab.url.split("/");
    var embedded = "http://www.twitch.tv/" + string[3] + "/popout"
    chrome.windows.create({url: embedded, type: "panel", height: 376, width: 600});
  }
  else {
    alert("other");
  }

  
});