chrome.extension.sendMessage({
	action: "getSource",
	source: document.body.innerHTML
});