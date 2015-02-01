ImmediatelyUnlock.unlockHandler = function(){
	
};

ImmediatelyUnlock.unlockHandlers = {
	allmyvideos: function(){

		var data = $('form[name=F1]').serializeArray();

		$.post('', data, function(res){

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

			window.open(videos[videos.length - 1].file);

			ImmediatelyUnlock.success();
		})
	},
	f2h: function(){

		$('form[name=myform]').submit();

		return true;
	},
	upf: function(){

		var $form = $('#downloadContent').children('form'),
			formData = $form.serialize();

		$.post('', formData, function(res){

			window.open(res.match(/(http:\/\/down[^"]*)/)[1]);

			ImmediatelyUnlock.success();
		});
	},
	koshare: function(){

		$.get('m1.php', function(res){

			window.open($(res).find('.groovybutton').attr('onclick').match(/NewWindow\('([^']*)/)[1]);
		});
	}
};