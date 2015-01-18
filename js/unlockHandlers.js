ImmediatelyUnlock.unlockHandlers = {
	allmyvideos: function(source){

		var data = $(source).find('form[name=F1]').serializeArray();

		$.post(ImmediatelyUnlock.tabProperties.url, data, function(res){

			var videos = [];

			try{
				res = res.match(/"sources"\s*:\s*\[[^{]*({[^}]*}[^\]]*)]/)[1].match(/{[^}]*}/g);
			}
			catch(e){}

			if(!res)
				return;

			res.forEach(function(video){
				videos.push(JSON.parse(video));
			});

			window.open(videos[0].file);

			return true;
		})
	},
	f2h: function(source){

		var $page = $(source).find('form[name=myform]');

		$page.submit();

		return true;
	}
};