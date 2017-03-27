// Load Twitter authorization file and package
var twitterAuth = require('./keys.js');
var twitter = require('twitter');
var client = new twitter(twitterAuth.twitterKeys);

// Load packges spotify(music), omdb(movie), fs(file read/write) for LIRI
var spotify = require('spotify');
var omdb = require('omdb');
var fs = require("fs");

// Get user inputs
var userInput = process.argv[2];
var titleName = process.argv.slice(3).join(' ');

// LIRI command actions
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

// Get latest 10 tweets from me
function latestTweets(){
	client.get('/statuses/user_timeline.json', { count: 10 }, function(error, tweet) {

	  if (!error) { 
	    for(i=0;i<10;i++){
	    	console.log("Tweet: " + (parseInt(i)+1) + " Posted at : " + tweet[i].created_at);
	    	console.log(tweet[i].text);
	  		console.log("");   
	    }
	  }
	});
}

// Get details of the track provided
function spotified(trackName){
	spotify.search({ type: 'track', query: trackName}, function(error, data) {	
	    if (!error) {     
	        console.log("Song name : " + data.tracks.items[0].name);
	        console.log("Preview link : " + data.tracks.items[0].preview_url);
	        console.log("Album name : " + data.tracks.items[0].album.name);
	        console.log("Artist(s) : " + data.tracks.items[0].artists[0].name);
	    }
	});
}

// Get details of the movie provided
function movieThis(movieName){
	omdb.get({ title: movieName}, true, function(error, movie) {
	    if (!error) { 	    	
	    	if(movie){
	    		console.log("Title : " + movie.title);
	    		console.log("Year : " + movie.year);
	    		console.log("IMDB Rating : " + movie.imdb.rating);
	    		console.log("Country : " + movie.countries);
	    		// console.log("Language : "+movie);
	    		console.log("Plot : " + movie.plot);
	    		console.log("Actors : " + movie.actors);
	    		// console.log("Rotten Tomatoes Rating : " + movie.tomato);
	    		// console.log("Rotten Tomatoes URL : " + movie.tomato);
	    	}else{
	    		console.log("Movie NOT found");
	    	}
		}
	});
}

//Read the text file and then use it to call one of LIRI's commands.
function doThis(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		data = data.split(",");
		var userInput = data[0];
		var titleName = data[1];
		userRequest(userInput,titleName);
	});
}

// Call LIRI commands with user inputs
userRequest(userInput,titleName);

if(!userInput){
	console.log("Enter any of the below options");
	console.log("1. my-tweets");
	console.log("2. spotify-this-song <song name>");
	console.log("3. movie-this <movie-name>");
	console.log("4. do-what-it-says");
}