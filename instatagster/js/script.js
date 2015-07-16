$(function() {
	//Logging selected hashtags into collection
	  function log( message ) {
	    $( "<div>" ).html( message ).prependTo( "#log" );
	    $( "#log" ).scrollTop( 0 );
	  }
	
	//Autocomplete by jQuery for #hashtag search field
	  $( "#hashtag" ).autocomplete({
	    source: function( request, response ) {
	      $.ajax({
		
			//using Instagram end-point for searching tags (Note:access_token is required. Current token is connected to a test instagram app)
	        url: "https://api.instagram.com/v1/tags/search?q=" + request.term + "&access_token=3257417.832b67c.a001f0a15ba94f0c98331fec070163cd",
	        dataType: "jsonp",
	        data: {
	          q: request.term
	        },
	
	        success: function( data ) {
			//Get results from instagram (object)
	         var instaTags = data.data;
			// Clean results to select names of the tags only
	         var $autoCompleteArray = [];
	         for(var $i = 0; $i<instaTags.length; $i++) { 
	           $autoCompleteArray.push( instaTags[$i]['name'] );
	         }
			//Returning response with tag names
	         response( $autoCompleteArray );
	        }
	      });
	    },
	
		//Initiating search after at least 2 letters were entered in the searchbox
	    minLength: 2,
	
		//Prepare tag for collection
	    select: function( event, ui ) {
		//Get time stamp
	      var d = new Date();
		//Add tag name and timestamp
	      log( ui.item ?
	        "<span>#" + ui.item.label + '</span>&nbsp;&nbsp;added:&nbsp;' + d.toLocaleString() :
	        "Nothing selected, input was " + this.value);
	    }
	  });
});
