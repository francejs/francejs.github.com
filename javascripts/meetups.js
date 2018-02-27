(function() {
    // loads meetup.com events via JSONP
    // https://www.meetup.com/fr-FR/meetup_api/auth/#keysign

    // use API signed urls
    const meetupsUrl =
        "https://api.meetup.com/events?offset=0&before=3m&format=json&group_id=9114182%2C2753202%2C10685042%2C3547912%2C8516612%2C6578312%2C3549682%2C7613172%2C3948412%2C10809052%2C8524122%2C10467552%2C5580242%2C3832302%2C2875862%2C11263702%2C8607622%2C10698982%2C6939902%2C10617582%2C4878062%2C2504782%2C11687472%2C13092622%2C14810042%2C17920532%2C13111762%2C16222542%2C18305583%2C15351542%2C5477392%2C18760220%2C18494651%2C2124131%2C18380309%2C18395295%2C16765722%2C18448516%2C18467130%2C19725441%2C19657451%2C21276917%2C21032129%2C26082883%2C18684526%2C22592902%2C24515162%2C20803737%2C18464962%2C19446895%2C17953882%2C19905746%2C22260880%2C18520882%2C27112899%2C15900042%2C22816724%2C19458797%2C21985930%2C21957984%2C19960529%2C18231415%2C19944014%2C3948412%2C19510188&photo-host=public&page=100&radius=25.0&fields=&order=time&status=upcoming&desc=false&sig_id=24287712&sig=13c0b661be0cf6ec28dc8e3cbea8148b1dc1e24a&callback=window.meetupCallback";

    // meetup.com JSONP callback
    window.meetupCallback = function(data) {
        if (!data.results) {
            throw new Error("cannot fetch meetups");
        }
        var tgt = document.getElementById("events-list");
        if (!tgt) {
            throw new Error("cannot find target event-list");
        }
        // group items by date
        var dates = {};
        data.results.forEach(function(event) {
            var eventDate = new Date(event.time).toLocaleDateString();
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
                html.push(
                    "<dd><b>" +
                        eventDetails.group.urlname +
                        "</b> : <a href='" +
                        eventDetails.event_url +
                        "'>" +
                        eventDetails.name +
                        "</a></dd>"
                );
            }
        }
        tgt.innerHTML = html.join("");
    };

    function jsonpLoad(url) {
        var script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
    }

    jsonpLoad(meetupsUrl);
})();
