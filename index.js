var Twit = require('twit')
var fs = require('fs'); //Pour sauver avancement
var jsonContrepeterie = require("./jsonContrepeterie.json");
var jsonSalutations = require("./jsonSalutations.json");
var answeredTweets = require("./answeredTweetsId.json");
var jsonCredentials = require("./credentials.json");
 
var T = new Twit({
  consumer_key:         jsonCredentials.twitter.consumer_key,
  consumer_secret:      jsonCredentials.twitter.consumer_secret,
  access_token:         jsonCredentials.twitter.access_token,
  access_token_secret:  jsonCredentials.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

// Une fois que répondu, marqué mostRecent, le premier tweet, et le mettre en sinceId (argument d'appel de mentions_timeline)


//TODO récup aléatoire une contrepetrie #contrepetrie

//Récupération de tous les tweets me mentionnant
var mostRecentId;
var allIdsMentioning=[]; //Récupère l'ID du tweet concerné
var allScreenNamesMentioning=[]; //Récupère le screenname du tweetos m'ayant cité (ex @QuentinLO10)

function repondreTweets(){
	T.get("statuses/mentions_timeline", { resources : "statuses" } , function(err, data, response) {
		
	  //console.log("data0 " +JSON.stringify(data[0], null,2));
	  //mostRecentId = data[0].id_str;
	  //console.log("mostrecentid :" + mostRecentId);
	  
	  //console.log("Text : "+data[0].text);
	  
	  allIdsMentioning=[];
	  allScreenNamesMentioning=[];
	  for (var i in data){
		  allIdsMentioning.push(data[i].id_str);
		  allScreenNamesMentioning.push(data[i].user.screen_name);
		  
		  //console.log("answeredTweets : "+answeredTweets);
		  
		var text = data[i].text.toLowerCase();
		text = text.replace(/[èéêë]/g,"e")
		if(answeredTweets.indexOf(data[i].id_str)==-1){
			if (text.includes("contrepeterie") || text.includes("contrepetrie")){
				    console.log("Contrepeterie trouvée pour le tweet de @"+ data[i].user.screen_name);
				    envoyerContrepeterie(data[i]);
			}else if (text.includes("airquality")){
					console.log("Cherche Qualité de l'Air");
					var ville = trouverVilleDansTexte(text);
					obtenirQualiteAir(data[i], ville);
				
			}else if (text.includes("pokemon") || text.includes("pokémon")){
					console.log("Quel Pokémon je suis ?");
					pokemonIdentifier(data[i]);				
				
			}else if (text.includes("imdb")){
					console.log("imdb detected");
					if(verifSaisieImdb(text, data[i])){
						infosImdb(data[i]);	
					}	
								
			}else {
					console.log("Saluons le tweetos !");
					saluerTweetos(data[i]);
				  
			}
		
		}
		  
		  
		  
		  
	  }
	  //console.log("all Ids récupérées : " +allIdsMentioning);
	  //console.log("all Screen Names récupérées : " +allScreenNamesMentioning);

	  
	 // for (var j in allScreenNamesMentioning){
		  
		  

		  /*
		  T.post('statuses/update', { status: '@'+ allScreenNamesMentioning[j] +' Ce tweet ne m\'intéresse pas tellement. (Réponse en cours d\'amélioration.)' , 
									  in_reply_to_status_id: allIdsMentioning[j]  }, function(err, data, response) {
			console.log(data);
		  });
		  */
		  
	  
	 // }
	});
}


function envoyerContrepeterie (jsonTweet){
	
	var idTweet = jsonTweet.id_str;
	
	var randomIntContrepeterie = Math.floor((Math.random() * jsonContrepeterie.contrepeterie.length));
	console.log("randomInt : "+randomIntContrepeterie);
	console.log(jsonContrepeterie.contrepeterie[randomIntContrepeterie].original)
	var reponse = "@"+jsonTweet.user.screen_name+" "+jsonContrepeterie.contrepeterie[randomIntContrepeterie].original;
	console.log(reponse);
	posterTweet(reponse, idTweet);	  
	sauverTweetRepondu(jsonTweet);	  
	
	
}

function saluerTweetos (jsonTweet){
	
	var idTweet = jsonTweet.id_str;
	
	var randomIntSalutation = Math.floor((Math.random() * jsonSalutations.length));
	console.log("randomInt : "+randomIntSalutation);
	console.log(jsonSalutations[randomIntSalutation]);
	var reponse = jsonSalutations[randomIntSalutation]+' @'+ jsonTweet.user.screen_name +' !!';
	console.log(reponse);
	posterTweet(reponse, idTweet);	  
	sauverTweetRepondu(jsonTweet);		  
	
}


function sauverTweetRepondu(jsonTweet){
	var idTweet = jsonTweet.id_str;
	answeredTweets.push(idTweet);
	
	fs.writeFile('./answeredTweetsId.json',JSON.stringify(answeredTweets),

		function (err) {
			if (err) {
				console.error('Crap happens');
			}
		}
	);
}

function trouverVilleDansTexte(texte){

	console.log("Texte de base airquality: " +texte);
	var texteSplitte=texte.split(" ");
	var indexVille = texteSplitte.indexOf("airquality");
	var city = texteSplitte[indexVille + 1];
	return city;	
	
}	

function trouverFilmDansTexte(text){

	console.log("Texte de base IMDB : " +text);
	var firstQuotation = text.indexOf('"') +1 ;
	var lastQuotation = text.indexOf('"',firstQuotation);
	var text_to_get = text.substring(firstQuotation,lastQuotation);
	return text_to_get;
	console.log(text_to_get);
	
}	

function obtenirQualiteAir(jsonTweet, ville){
	
	console.log("Ville : " +ville);
	var idTweet = jsonTweet.id_str;
	var indiceDeQualite="";
	var description="";
	var pathWithCity = '/baqi/?location=' +encodeURI(ville)+ '&key=' +jsonCredentials.breezometer.key;
	var reponse="";
	
	var http = require('http');
	var options = {
	  host: 'api.breezometer.com',
	  port: 80,
	  path: pathWithCity
	};
	http.get(options, function(res) {
	  console.log("Got response: " + res.statusCode);
	  var content = "";
	  res.on("data", function(chunk) {
		//console.log("BODY: " + chunk);
		content += chunk;
		
	  });
	  
	  res.on("end", function(){
		jsonContent = JSON.parse(content);
		indiceDeQualite = jsonContent.breezometer_aqi;
		console.log("Indice de Qualité : "+indiceDeQualite);	
		description = jsonContent.breezometer_description;
		console.log("Conseil : "+description);
		var villeAvecMaj= ville[0].toUpperCase() + ville.slice(1);
		if(description === undefined){
			reponse = "@" + jsonTweet.user.screen_name + " We don't have any data for " + villeAvecMaj + ", sorry for the inconvenience...";
		}else {
			reponse = "@" + jsonTweet.user.screen_name + " QI : " + indiceDeQualite + " - " + description + " in " +villeAvecMaj;
		}	
		console.log("reponseAir : "+reponse);
		posterTweet(reponse, idTweet);
		sauverTweetRepondu(jsonTweet);  
		  
	  });
	  
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	//TODO régler problème parseur... Au pire, try catch et on relance le process
}


function pokemonIdentifier(jsonTweet){
	
	var idTweetReponse = jsonTweet.id_str;
	var numPokemon = Math.floor((Math.random()*151)+1);
	console.log(numPokemon);
	var pathPokemon = '/api/v2/pokemon/' +numPokemon+'/';

	var http = require('http');
	var options = {
	  host: 'pokeapi.co',
	  path: pathPokemon
	};

	http.get(options, function(res) {
	  console.log("Got response: " + res.statusCode);

	  var content="";
	  res.on("data", function(chunk) {
		//console.log("BODY: " + chunk);
		content+=chunk;
	  });
	  res.on("end",function(){
		var jsonContent=JSON.parse(content);  
		var pokemonName = jsonContent.name;
		pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
		console.log("Pokemon Name : "+pokemonName);  
		var contenuTweet= "@" + jsonTweet.user.screen_name + " I guess you look like..." + pokemonName + " !";
		posterTweet(contenuTweet, idTweetReponse);
		sauverTweetRepondu(jsonTweet);
	  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	
	
	
}

function posterTweet(contenuTweet, idTweetReponse){
	
	T.post('statuses/update', { status: contenuTweet , in_reply_to_status_id: idTweetReponse  }, function(err, data, response) {
			//console.log(data);
			console.log("Tweet Envoyé");
		  });

}

function getTwoFirstActors (actorsList){

	var arrayActors = actorsList.split(",");
	return arrayActors[0] + " and"+ arrayActors[1];

}

function verifSaisieImdb (textTweet, jsonTweet) {

	//TODO tester s'il y a au moins DEUX ' " '

	if (!textTweet.includes('"')){
		var messageError = 'Désolé @' + jsonTweet.user.screen_name + ' , votre saisie doit être comme ceci : imdb "filmousérie". ';
		console.log( "Tweet IMDB n'a pas de guillemets.");
		posterTweet(messageError, jsonTweet.id_str);
		sauverTweetRepondu(jsonTweet);
		return false;
	} else { //pour tester si au moins deux "
		var finSaisie = textTweet.slice((textTweet.indexOf('"'))+1);
		console.log("finSaisie : "+ finSaisie);
		if(!finSaisie.includes('"')){
			var messageError = 'Désolé @' + jsonTweet.user.screen_name + ' , votre saisie doit être comme ceci : imdb "filmousérie". ';
			console.log( "Tweet IMDB n'a pas deux guillemets.");
			posterTweet(messageError, jsonTweet.id_str);
			sauverTweetRepondu(jsonTweet);
			return false;
		}

	}
	return true;

}


function infosImdb(jsonTweet){
	
	var idTweetReponse = jsonTweet.id_str;
	console.log("Contenu Tweet : "+jsonTweet.text);
	var movie = trouverFilmDansTexte(jsonTweet.text);
	console.log("Movie récupéré " +movie);
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
			/*
			var tweetReponseFilm = "@" + jsonTweet.user.screen_name + " " +jsonFilm.Title + "(" + jsonFilm.Year + "), " + jsonFilm.Type + " by " + mediaOwner + " with " + jsonFilm.Actors + ". Rated "+jsonFilm.imdbRating+". ";
			if(tweetReponseFilm && jsonFilm.genre && ((tweetReponseFilm.length + jsonFilm.Genre.length) < 140 )){
				tweetReponseFilm += jsonFilm.Genre + ".";
			}
			console.log("Length : " +tweetReponseFilm.length);
			
			*/

			if(jsonFilm.Response == "False"){
				var tweetReponseFilm = "Désolé @" + jsonTweet.user.screen_name + " nous n'avons pu trouver d'infos pour votre requète";
				console.log("Film ou série non trouvée.");
				posterTweet(tweetReponseFilm, idTweetReponse);
				sauverTweetRepondu(jsonTweet);


			} else {

				var tweetReponseFilm1 = "@" + jsonTweet.user.screen_name + " " + jsonFilm.Title + "(" + jsonFilm.Year + ") by " + mediaOwner + " with "+ getTwoFirstActors(jsonFilm.Actors) +". Rated "+jsonFilm.imdbRating+". " + jsonFilm.Genre +".";
				var tweetReponseFilm2 = "@" + jsonTweet.user.screen_name + " " + jsonFilm.Title + " : " + jsonFilm.Plot ;


				console.log("Film trouvé : " +tweetReponseFilm1 + tweetReponseFilm2);
				posterTweet(tweetReponseFilm1, idTweetReponse);
				posterTweet(tweetReponseFilm2, idTweetReponse);
				sauverTweetRepondu(jsonTweet);

			}




			
		  });
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
	});

}

console.log("Bot démarré !");
repondreTweets();
setInterval(repondreTweets,120000);

