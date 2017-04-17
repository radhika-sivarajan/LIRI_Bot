# LIRI Bot
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## To Install
* Git Clone the repository to your local machine.
* Navigate to the folder where the repository in Terminal.
* Run the command `npm install` to download the required dependencies.

## Dependencies
npm packages
1. `request` (Simplified HTTP request client.)
1. `spotify` (API library for the Spotify REST API.)
1. `twitter`(Twitter API client library)

## To Run

Run LIRI using following commands:

	node liri.js my-tweet

(Display users 10 tweets)

	node liri.js spotify-this-song

(This will show the following information about the song in your terminal/bash window
- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from

If no song is provided then your program will default to
-"The Sign" by Ace of Base)

	node liri.js movie-this

(This will output the following information to your terminal/bash window:
- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.
- Rotten Tomatoes Rating.
- Rotten Tomatoes URL.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.')

	node liri.js do-what-it-says

(LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.)
