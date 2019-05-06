chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, { file: "jquery-3.4.1.min.js" },
		function() {
			chrome.tabs.executeScript(null, {file: "howlong.js"});
		});
});
