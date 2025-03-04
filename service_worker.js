chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
	  target: { tabId: tab.id },
	  files: ['jquery-3.4.1.min.js']
	}).then(() => {
	  chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['howlong.js']
	  });
	});
  });
