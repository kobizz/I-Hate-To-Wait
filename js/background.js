chrome.extension.onMessage.addListener(function(request, sender){

	if(request.action != 'markSupportedSite')
		return;

	chrome.pageAction.setIcon({
		tabId: sender.tab.id,
		path: {
			19: 'icons/browser/disabled/icon-19.png',
			38: 'icons/browser/disabled/icon-38.png'
		}
	});

	chrome.pageAction.show(sender.tab.id);
});