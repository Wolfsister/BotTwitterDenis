/*

var jsonContrepeterie = require("./jsonContrepeterie.json");



console.log(jsonContrepeterie.contrepeterie[0].original);
console.log("length : "+jsonContrepeterie.contrepeterie.length);


var randomIntContrepeterie = Math.floor((Math.random() * jsonContrepeterie.contrepeterie.length));
	console.log("randomInt : "+randomIntContrepeterie);
	console.log(jsonContrepeterie.contrepeterie[randomIntContrepeterie].original)
	
	
	
	
	
var fs = require('fs'); //Pour sauver avancement
var jsonContrepeterie = require("./jsonContrepeterie.json");
var answeredTweets = require("./my.json");

//answeredTweets.push('3');
console.log(answeredTweets.indexOf("4"));



var jsonSalutations = require("./jsonSalutations.json");

	
	var randomIntSalutation = Math.floor((Math.random() * jsonSalutations.length));
	console.log("randomInt : "+randomIntSalutation);
	console.log(jsonSalutations[randomIntSalutation]);
	
	*/
	
function trouverFilmDansTexte(text){

	console.log("Texte de base IMDB : " +text);
	var firstQuotation = text.indexOf('"') + 1 ;
	var lastQuotation = text.indexOf('"',firstQuotation);
	var text_to_get = text.substring(firstQuotation,lastQuotation);
	// return text_to_get;
	console.log("Texte to get : "+text_to_get);
	
}	

trouverFilmDansTexte('@Denis imdb "The Incredibles" Bonjour !');	