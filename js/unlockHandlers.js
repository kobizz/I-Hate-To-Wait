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

			ImmediatelyUnlock.success();
		})
	},
	f2h: function(source){

		var $form = $(source).find('form[name=myform]');

		$form.submit();

		return true;
	},
	upf: function(source){

		var $form = $(source).find('#downloadContent').children('form'),
			formData = $form.serialize();

		$.post(this.url, formData, function(res){

			window.open(res.match(/(http:\/\/down[^"]*)/)[1]);

			ImmediatelyUnlock.success();
		});
	}
};