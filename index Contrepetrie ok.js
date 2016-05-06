var Twit = require('twit')
var fs = require('fs'); //Pour sauver avancement
var jsonContrepeterie = require("./jsonContrepeterie.json");
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
		
	  console.log("data0 " +JSON.stringify(data[0], null,2));
	  mostRecentId = data[0].id_str;
	  console.log("mostrecentid :" + mostRecentId);
	  
	  //console.log("Text : "+data[0].text);
	  
	  allIdsMentioning=[];
	  allScreenNamesMentioning=[];
	  for (var i in data){
		  allIdsMentioning.push(data[i].id_str);
		  allScreenNamesMentioning.push(data[i].user.screen_name);
		  
		  //console.log("answeredTweets : "+answeredTweets);
		  
		  var text = data[i].text;
		  if ((text.toLowerCase().includes("contrepeterie") || text.toLowerCase().includes("contrepèterie")) && answeredTweets.indexOf(data[i].id_str)==-1){
			  console.log("Contrepeterie trouvée pour le tweet de @"+ data[i].user.screen_name);
			  envoyerContrepeterie(data[i]);
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

repondreTweets();
setInterval(repondreTweets,120000);

