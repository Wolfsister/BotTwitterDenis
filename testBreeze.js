

function getAirQuality(){
	var http = require('http');
	var options = {
	  host: 'api.breezometer.com',
	  port: 80,
	  path: '/baqi/?location=Troyes&key=' + jsonCredentials.breezometer.key;
	};
	var aqi="";
	http.get(options, function(res) {
	  console.log("Got response: " + res.statusCode);
	  res.on("data", function(chunk) {
		console.log("BODY: " + chunk);
		try{
			var dataJson = JSON.parse(chunk);
			aqi=dataJson.breezometer_aqi;
			console.log("Indice de Qualité : "+dataJson.breezometer_aqi);
			console.log("Conseil : "+dataJson.breezometer_description);
		}
		catch(e){
			console.log(e);
			console.log("DANS CAAAAAAAAAAAAAAATCH !!!!!!!!!");
			getAirQuality();
		}
		
		
	  });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
}


getAirQuality();

/*


var texte = "@LO10Denis airQuality Caen";
var texteSplitte=texte.split(" ");
var indexVille = texteSplitte.indexOf("airQuality");
var city = texteSplitte[indexVille + 1];
console.log(city);	

*/
