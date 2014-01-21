;(function( win, doc ) {

  $(win).ready(function() {
    var content = "Pas de jobs pour le moment !"
      , $jobs = $('.fjs-js-Jobs')
      , docFrag = doc.createDocumentFragment()

    $
      .ajax({
        url: win.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://jobs.humancoders.com/javascript/jobs.rss'),
        dataType: 'json'
      })
      .done( function( res ) {
        if ( res.responseData.feed && res.responseData.feed.entries ) {

          var $ul = $('<ul>')

          $.each( res.responseData.feed.entries, function ( i, e ) {
            var $li = $('<li><a href="' + e.link + '">' + e.title + ' @ ' + e.author + '</a></li>')

            $ul.append($li)
          })

          content = docFrag.appendChild($ul[0])
        }
      })
      .always( function() {
        $jobs.html(content)
      })

  })

})( window, window.document )
