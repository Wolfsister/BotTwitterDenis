var movie = 'Weeds';
var http = require('http');
	var options = {
	  host: 'omdbapi.com',
	  port: 80,
	  path: '/?t=' + encodeURI(movie) 
	};
	var aqi="";
	http.get(options, function(res) {
		  console.log("Got response: " + res.statusCode);
	
		  var content="";
		  
		  res.on("data", function(chunk) {
			content+=chunk;
		  });
		  
		  res.on("end",function(){
			console.log(content);
			var jsonFilm = JSON.parse(content);
			var mediaOwner=jsonFilm.Director;
			if(mediaOwner == "N/A"){
				mediaOwner = jsonFilm.Writer;
			}
			var tweetReponseFilm = jsonFilm.Title + "(" + jsonFilm.Year + ") by " + mediaOwner + " with " + jsonFilm.Actors + ". Rated "+jsonFilm.imdbRating+". " + jsonFilm.Genre +".";
			//console.log(jsonFilm.Title + jsonFilm.Director + jsonFilm.Year + jsonFilm.imdbRating );
			//console.log("Length : "+jsonFilm.Plot.length);
			console.log(tweetReponseFilm);
			//sauverTweetRepondu(jsonTweet);
		  });
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
	});