;(function() {

    // loads meetup.com events via JSONP

    var meetupConfig = {
        // meetup Ids can be found in the meetup page, global var "chapterId" (WTF)
        // or extracted from https://api.meetup.com/find/groups?&sign=true&text=Javascript&country=FR,CA&page=100
        meetupsIds: [9114182, 2753202, 10685042, 3547912, 8516612, 6578312, 3549682, 7613172, 3948412, 10809052, 8524122, 10467552, 5580242, 3832302, 2875862, 11263702, 8607622, 10698982, 6939902, 10617582, 4878062, 2504782, 11687472, 13092622, 14810042, 17920532, 13111762, 16222542, 18305583, 15351542, 5477392, 18760220, 18494651, 2124131, 18380309, 18395295, 16765722, 18448516].join(','),
        // this is mine :/
        apiKey : '34332b3e4829556513f2d1712717158'
    };

    // meetup.com JSONP callback
    window.meetupCallback = function(data) {
        if (!data.results) {
            throw new Error('cannot fetch meetups');
        }
        var tgt = document.getElementById('events-list');
        if (!tgt) {
            throw new Error('cannot find target event-list');
        }
        // group items by date
        var dates = {};
        data.results.forEach(function(event) {
            var eventDate = (new Date(event.time)).toLocaleDateString();
            if (!dates[eventDate]) {
                dates[eventDate] = [];
            }
            dates[eventDate].push(event);
        });
        // build events HTML
        var html = [];
        for (var date in dates) {
            html.push("<dt>" + date + "</dt>");
            for (var event in dates[date]) {
                var eventDetails = dates[date][event];
                html.push("<dd><a href='" + eventDetails.event_url + "'>" + eventDetails.name + "</a></dd>");
            }
        }
        tgt.innerHTML = html.join('');
    };

    function jsonpLoad(url) {
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    }

    var meetupsUrl = 'http://api.meetup.com/2/events?group_id=' + meetupConfig.meetupsIds + '&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=50&fields=&sign=true&key=' + meetupConfig.apiKey + '&callback=window.meetupCallback';

    jsonpLoad(meetupsUrl);

})();
