var twitterAuth = require('./keys.js');
var twitter = require('twitter');
var client = new twitter(twitterAuth.twitterKeys);

var spotify = require('spotify');
var omdb = require('omdb');
var fs = require("fs");

var userInput = process.argv[2];
var titleName = process.argv.slice(3).join(' ');

function userRequest(userInput,titleName){
	switch(userInput){
		case ("my-tweets"): 
			latestTweets();
			break;
		case ("spotify-this-song"): 
			titleName ? spotified(titleName) : spotified("I saw the sign");
			break;
		case ("movie-this"): 
			titleName ? movieThis(titleName) : movieThis("Mr Nobody");
			break;
		case ("do-what-it-says"): 
			doThis();
			break;
	}
}

function latestTweets(){
	client.get('/statuses/user_timeline.json', { count: 10 }, function(error, tweet) {

	  if (!error) { 
	    for(i=0;i<10;i++){
	    	console.log("Tweet: "+ (parseInt(i)+1) + " Created at : " + tweet[i].created_at);
	    	console.log(tweet[i].text);
	  		console.log("");   
	    }
	  }
	});
}

function spotified(trackName){
	spotify.search({ type: 'track', query: trackName}, function(error, data) {	
	    if (!error) {     
	        console.log("Song name : " +data.tracks.items[0].name);
	        console.log("Preview link : " +data.tracks.items[0].preview_url);
	        console.log("Album name : " +data.tracks.items[0].album.name);
	        console.log("Artist(s) : " +data.tracks.items[0].artists[0].name);
	    }
	});
}

function movieThis(movieName){
	omdb.get({ title: movieName}, true, function(error, movie) {
	    if (!error) { 
	    	console.log("Title : "+movie.title);
	    	console.log("Year : "+movie.year);
	    	console.log("IMDB Rating : "+movie.imdb.rating);
	    	console.log("Country : "+movie.countries);
	    	// console.log("Language : "+movie);
	    	console.log("Plot : "+movie.plot);
	    	console.log("Actors : "+movie.actors);
	    	// console.log("Rotten Tomatoes Rating : "+movie.tomato);
	    	// console.log("Rotten Tomatoes URL : "+movie.tomato);
		}
	});
}

function doThis(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		data = data.split(",");
		var userInput = data[0];
		var titleName = data[1];
		userRequest(userInput,titleName);
	});
}

userRequest(userInput,titleName);
