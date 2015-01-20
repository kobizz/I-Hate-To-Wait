/** @namespace chrome.i18n */

const IMAGES_DIR = 'images';

var ImmediatelyUnlock = {
	components: {},
	properties: {},
	settings: {
		injectedFile: 'js/download.js',
		listenerKey: 'getSource'
	},
	tabProperties: {},
	addListener: function(){

		var self = this;

		chrome.extension.onMessage.addListener(function(request, sender){

			if(request.action != self.settings.listenerKey)
				return;

			self.wait();

			self.tab = sender;

			self.tabProperties.innerHTML = request.source;

			self.unlock();
		});
	},
	executeScript: function(){

		chrome.tabs.executeScript(null, {
			file: this.settings.injectedFile
		}, function(){
			if(chrome.extension.lastError) {
				console.log('There was an error injecting script : \n' + chrome.extension.lastError.message);
			}
		});
	},
	getHostFromURL: function(){

		var hostname = this.tabProperties.url.match(/https?:\/\/([^\/]*)/);

		return hostname && hostname[1];
	},
	getSiteTag: function(){

		return this.supportedSites[this.tabProperties.hostname];
	},
	getUnlockHandler: function(){

		return this.unlockHandlers[this.getSiteTag()];
	},
	init: function(){

		var self = this;

		chrome.tabs.getSelected(null, function(tab){

			self.initTabProperties(tab);

			self.initProperties();

			self.initComponents();

			self.run();
		});
	},
	initComponents: function(){

		this.components.$indicator = $('#indicator');

		this.components.$indicatorImage = $('#indicator-image');

		this.components.$indicatorMessage = $('#indicator-message');
	},
	isSupportedSite: function(){

		return !!this.properties.unlockHandler;
	},
	initProperties: function(){

		this.properties.unlockHandler = this.getUnlockHandler();
	},
	initTabProperties: function(tab){

		this.tabProperties.url = tab.url;

		this.tabProperties.hostname = this.getHostFromURL();
	},
	onUnlockSuccess: function(){

		this.components.$indicator.text('unlock success!');
	},
	run: function(){

		if(!this.isSupportedSite())
			return;

		this.addListener();

		this.executeScript();
	},
	success: function(){

		this.writeStatus(chrome.i18n.getMessage('unlockSuccess'), 'done1.png');
	},
	unlock: function(){

		var unlockHandler = this.getUnlockHandler();

		if(unlockHandler.call(this.tab, this.tabProperties.innerHTML))
			this.success();
	},
	wait: function(){

		this.writeStatus(chrome.i18n.getMessage('pleaseWait'), 'loader.gif');
	},
	writeStatus: function(message, image){

		this.components.$indicatorMessage.text(message);

		this.components.$indicatorImage.attr('src', image ? IMAGES_DIR + '/' + image : '');
	}
};