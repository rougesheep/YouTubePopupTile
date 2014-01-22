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
  var uri = new Uri(tab.url);
  var protocol = uri.protocol().toString();
  var host = uri.host().toString();
  var path = uri.path().toString();
  var query = uri.query().toString();

  //alert(" protocol: " + protocol + " host: " + host + " path: " + path + " query: " + query);
  
  switch (host) {

    case "www.youtube.com":
      var video = query.substring(3);
      video = (video.split("&"))[0];
      //small medium large
      var embedded = "https://www.youtube.com/embed/" + video + "&vq=hd720";
      //alert(embedded);
      //Close current tab
	  chrome.tabs.remove(tab.id);
      //Open embedded URL in a panel
      chrome.windows.create({url: embedded, type: "panel", height: 376, width: 600});
      break;

    case "www.twitch.tv":
      //alert("Twitch stream " + path);
      var embedded = "http://www.twitch.tv" + path + "/popout"
      //Close current tab
	  chrome.tabs.remove(tab.id);
      //Open embedded URL in a panel
      chrome.windows.create({url: embedded, type: "panel", height: 376, width: 560});
      break;

    default:
      alert("I don't know.");
      break;
  }

  /*
  if (tab.url.indexOf("youtube") != -1) {
    
    //Split url into array
    //var string = tab.url.split("v=");
    //var embedded = "https://www.youtube.com/embed/" + string[1];
    //Close current tab
    //chrome.tabs.remove(tab.id);
    //Open embedded URL in a panel
    //chrome.windows.create({url: embedded, type: "panel", height: 376, width: 600});
  }
  else if (tab.url.indexOf("twitch") != -1) {
    var string = tab.url.split("/");
    var embedded = "http://www.twitch.tv/" + string[3] + "/popout"
    chrome.windows.create({url: embedded, type: "panel", height: 376, width: 600});
  }
  else {
    alert("Something went wrong.");
  }
  */
});