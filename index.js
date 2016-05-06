var Twit = require('twit')
var fs = require('fs'); //Pour sauver avancement
var jsonContrepeterie = require("./jsonContrepeterie.json");
var jsonSalutations = require("./jsonSalutations.json");
var answeredTweets = require("./answeredTweetsId.json");
 
var T = new Twit({
  consumer_key:         '9xpMqXO5TjOJYQk1nrxvKpkj8',
  consumer_secret:      '9oIuBAiwzYsd7ZW1B4I0R9kLbQkLfaepeLJJ6GDzTgeQlqSeFx',
  access_token:         '727819450804805634-ZAOWLuG7qLYCi2r3ddzaBcIPAgIBadT',
  access_token_secret:  'l5FIPWMhHrOLeQErTAPQQSSV1vMjJcN9rjJ5dFLB90Cbv',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})




//TODO : récupérer instatustoreply


// Une fois que répondu, marqué mostRecent, le premier tweet, et le mettre en sinceId (argument d'appel de mentions_timeline)


//TODO récup aléatoire une contrepetrie #contrepetrie

//Récupération de tous les tweets me mentionnant
var mostRecentId;
var allIdsMentioning=[]; //Récupère l'ID du tweet concerné
var allScreenNamesMentioning=[]; //Récupère le screenname du tweetos m'ayant cité (ex @QuentinLO10)

function repondreTweets(){
	T.get("statuses/mentions_timeline", { resources : "statuses" } , function(err, data, response) {
		
	  //console.log("data0 " +JSON.stringify(data[0], null,2));
	  mostRecentId = data[0].id_str;
	  //console.log("mostrecentid :" + mostRecentId);
	  
	  //console.log("Text : "+data[0].text);
	  
	  allIdsMentioning=[];
	  allScreenNamesMentioning=[];
	  for (var i in data){
		  allIdsMentioning.push(data[i].id_str);
		  allScreenNamesMentioning.push(data[i].user.screen_name);
		  
		  //console.log("answeredTweets : "+answeredTweets);
		  
		  var text = data[i].text.toLowerCase();
		  if(answeredTweets.indexOf(data[i].id_str)==-1){
			  if (text.includes("contrepeterie") || text.includes("contrepèterie")){
				  console.log("Contrepeterie trouvée pour le tweet de @"+ data[i].user.screen_name);
				  envoyerContrepeterie(data[i]);
			  }else if (text.includes("airquality")){
					console.log("Cherche Qualité de l'Air");
					var ville = trouverVilleDansTexte(text);
					obtenirQualiteAir(data[i], ville);
								  
			  }else {
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
	
	T.post('statuses/update', { status: reponse , in_reply_to_status_id: jsonTweet.id_str  }, function(err, data, response) {
			console.log(data);
		  });
		  
	sauverTweetRepondu(jsonTweet);	  
	
	
}

function saluerTweetos (jsonTweet){
	
	var idTweet = jsonTweet.id_str;
	
	var randomIntSalutation = Math.floor((Math.random() * jsonSalutations.length));
	console.log("randomInt : "+randomIntSalutation);
	console.log(jsonSalutations[randomIntSalutation]);
	var reponse = jsonSalutations[randomIntSalutation]+' @'+ jsonTweet.user.screen_name +' !!';
	console.log(reponse);
	
	T.post('statuses/update', { status: reponse , 
									  in_reply_to_status_id: idTweet  }, function(err, data, response) {
			//console.log(data);
			console.log("réponse envoyée");
		  });
		  
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

	console.log("Texte de base : " +texte);
	var texteSplitte=texte.split(" ");
	var indexVille = texteSplitte.indexOf("airquality");
	var city = texteSplitte[indexVille + 1];
	return city;	
	
}	

function obtenirQualiteAir(jsonTweet, ville){
	
	console.log("Ville : " +ville);
	var idTweet = jsonTweet.id_str;
	var indiceDeQualite="";
	var description="";
	var pathWithCity = '/baqi/?location=' +ville+ '&key=f3c9d6d6f04048848a95222a17eaa9e2'
	var reponse="";
	
	var http = require('http');
	var options = {
	  host: 'api.breezometer.com',
	  port: 80,
	  path: pathWithCity
	};
	http.get(options, function(res) {
	  console.log("Got response: " + res.statusCode);
	  res.on("data", function(chunk) {
		console.log("BODY: " + chunk);
		chunk = JSON.parse(chunk);
		console.log("Indice de Qualité : "+chunk.breezometer_aqi);
		indiceDeQualite = chunk.breezometer_aqi;
		console.log("Conseil : "+chunk.breezometer_description);
		description = chunk.breezometer_description;
		if(description === undefined){
			reponse = "@" + jsonTweet.user.screen_name + " We don't have data for your city, sorry for the inconvenience...";
		}else {
			reponse = "@" + jsonTweet.user.screen_name + " QI : " + indiceDeQualite + " - " + description + " in " +ville[0].toUpperCase() + ville.slice(1);
		}	
		console.log("reponseAir : "+reponse);
		T.post('statuses/update', { status: reponse , in_reply_to_status_id: idTweet  }, function(err, data, response) {
			//console.log(data);
			console.log("réponse qualité air envoyée");
		  });
	
		sauverTweetRepondu(jsonTweet);
	  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	

	
	
	//TODO si ville non trouvée, le signaler dans le tweet 
}

function posterTweet(text, idTweetReponse){
	
	
	//TODO
}

repondreTweets();
setInterval(repondreTweets,120000);

