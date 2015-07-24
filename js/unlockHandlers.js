'use strict';

ImmediatelyUnlock.unlockHandler = function () {

};

ImmediatelyUnlock.unlockHandlers = {
    allmyvideos: function () {

        var data = $('form[name=F1]').serializeArray();

        $.post('', data, function (res) {

            var videos = [];

            try {
                res = res.match(/"sources"\s*:\s*\[[^{]*({[^}]*}[^\]]*)]/)[1].match(/{[^}]*}/g);
            }
            catch (e) {
            }

            if (!res)
                return;

            res.forEach(function (video) {
                videos.push(JSON.parse(video));
            });

            open(videos[videos.length - 1].file);

            ImmediatelyUnlock.success();
        })
    },
    f2h: function () {

        $('form[name=myform]').submit();

        return true;
    },
    upf: function () {

        var $form = $('#downloadContent').children('form'),
            formData = $form.serialize();

        $.post('', formData, function (res) {

            window.open(res.match(/(http:\/\/down[^"]*)/)[1]);

            ImmediatelyUnlock.success();
        });
    },
    koshare: function () {

        $.get('m1.php', function (res) {

            window.open($(res).find('.groovybutton').attr('onclick').match(/NewWindow\('([^']*)/)[1]);
        });
    },
    sdarot: function () {

        var serieRegex = '^/watch/(\\d+)',
            seasonRegex = '.*/season/(\\d+)',
            episodeRegex = '/episode/(\\d+)';

        var videoDetails = {
            serie: {
                regexp: new RegExp(serieRegex)
            },
            season: {
                regexp: new RegExp(serieRegex + seasonRegex)
            },
            episode: {
                regexp: new RegExp(serieRegex + seasonRegex + episodeRegex)
            }
        };

        if (!location.pathname.match(videoDetails.serie.regexp))
            return;

        var goToVideo = function (serie, season, episode) {

            var videoParams = {
                watch: false,
                serie: serie,
                season: season,
                episode: episode
            };

            $.post('/ajax/watch', videoParams, function (data) {

                if(data.error)
                    return ImmediatelyUnlock.error(data.error);
                
                var quality = data.hd ? 'hd' : 'sd',
                    token = data.watch[quality];

                var url = 'http://' + data.url + '/watch/' + quality + '/' + data.VID + '.mp4?token=' + token + '&time=' + data.time;

                open(url, '_blank');
            }, 'json');
        };

        var parseVideo = function (url) {

            var i = 1;

            for (var item in videoDetails) {

                if (!videoDetails.hasOwnProperty(item))
                    continue;

                var number = url.match(videoDetails[item].regexp);

                if (number)
                    videoDetails[item].number = number[i++];
            }

            if (videoDetails.season.number && videoDetails.episode.number)
                goToVideo(videoDetails.serie.number, videoDetails.season.number, videoDetails.episode.number);
        };

        parseVideo(location.pathname);

        $('#episode').children('li').on('click', function () {

            parseVideo($(this).children('a').attr('href'));
        })
    },
    videomega: function () {

        var iframe = $('iframe')[0];

        if (!iframe)
            return;

        var video = iframe.contentDocument.getElementById('container_html5_api');

        if (video)
            open(video.src);
    },
    tinylinks: function () {

        document.getElementById('skiplink').dispatchEvent(new MouseEvent('click'));
    }
};