var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         '9xpMqXO5TjOJYQk1nrxvKpkj8',
  consumer_secret:      '9oIuBAiwzYsd7ZW1B4I0R9kLbQkLfaepeLJJ6GDzTgeQlqSeFx',
  access_token:         '727819450804805634-ZAOWLuG7qLYCi2r3ddzaBcIPAgIBadT',
  access_token_secret:  'l5FIPWMhHrOLeQErTAPQQSSV1vMjJcN9rjJ5dFLB90Cbv',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

var i=0;

//Savoir si mes quotas d'utilisation de l'API sont respectés


function getStats(){
	T.get("application/rate_limit_status", { resources : "statuses"} , function(err, data, response) {
		console.log(JSON.stringify(data,null,2));
	});
}


getStats();
//setInterval(getStats, 10000);



