// Load Twitter authorization file and package
var twitterAuth = require('./keys.js');
var twitter = require('twitter');
var client = new twitter(twitterAuth.twitterKeys);
var request = require('request');

// Load packges spotify(music), omdb(movie), fs(file read/write) for LIRI
var spotify = require('spotify');
var fs = require("fs");

// Get user inputs
var userInput = process.argv[2];
var titleName = process.argv.slice(3).join(' ');

// LIRI command actions
function userRequest(userInput,titleName){
	var divider = "\n.................................\n";
	var user = userInput + " ";
	titleName ? user += titleName : user ;
	fs.appendFile("log.txt",divider);
	fs.appendFile("log.txt", user + "\n");	

	switch(userInput){
		case ("my-tweets"): 
			latestTweets();
			break;
		case ("spotify-this-song"): 
			titleName ? spotified(titleName) : spotified("The Sign Ace of Base");
			break;
		case ("movie-this"): 
			titleName ? movieThis(titleName) : movieThis("Mr Nobody");
			break;
		case ("do-what-it-says"): 
			doThis();
			break;
	}
}

// Get latest 10 tweets from my twitter feed
function latestTweets(){
	client.get('/statuses/user_timeline.json', { count: 10 }, function(error, tweet) {

		if (!error) { 
			for(i=0;i<10;i++){

				var tweets = "\nTweet: " + (parseInt(i)+1) 
					+ " Posted at : " + tweet[i].created_at 
					+ "\n" + tweet[i].text + "\n";

				console.log(tweets);  
				fs.appendFile("log.txt",tweets);
			}
			return true;
		}
	});
}

// Get details of the track provided
function spotified(trackName){
	spotify.search({ type: 'track', query: trackName}, function(error, data) {	
	    if (!error) { 
	    	var song = data.tracks.items[0];

	    	var songDetails = "\nSong name : " + song.name 	    		 
	    		+ "\nAlbum name : " + song.album.name
	    		+ "\nArtist(s) : " + song.artists[0].name
	    		+ "\nPreview link : " + song.preview_url;

	        console.log(songDetails);
	        fs.appendFile("log.txt",songDetails);
	        return true;
	    }
	});
}

// Get details of the movie provided from IMDB
function movieThis(movieName){	
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=full&tomatoes=true&r=json', function (error, response, data) {
		if (!error) { 
			var movie = JSON.parse(data);
	    	if(movie.Response === "True"){	    		
	    		var movieDetails = "\nTitle : " + movie.Title
	    			+ "\nYear : " + movie.Year
	    			+ "\nLanguage : " + movie.Language
	    			+ "\nActors : " + movie.Actors
	    			+ "\nIMDB Rating : " + movie.imdbRating
	    			+ "\nCountry(s) : " + movie.Country
	    			+ "\nRotten Tomatoes Rating  : " + movie.tomatoRating
	    			+ "\nRotten Tomatoes URL  : " + movie.tomatoURL
	    			+ "\nPlot : " + movie.Plot;

	    		console.log(movieDetails);
	        	fs.appendFile("log.txt",movieDetails);
	    	}else{
	    		console.log(movie.Error);
	    	}
	    	return true;
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
		return true;
	});
}

// Call LIRI commands with user inputs
userRequest(userInput,titleName);

// If there is no user input, Show the options.
if(!userInput){
	console.log("Enter any of the below options");
	console.log("1. my-tweets");
	console.log("2. spotify-this-song <song name>");
	console.log("3. movie-this <movie-name>");
	console.log("4. do-what-it-says");
}