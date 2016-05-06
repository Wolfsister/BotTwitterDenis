var key = "f3c9d6d6f04048848a95222a17eaa9e2";





var http = require('http');
var options = {
  host: 'api.breezometer.com',
  port: 80,
  path: '/baqi/?location=moscou&key=f3c9d6d6f04048848a95222a17eaa9e2'
};
var aqi="";
http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
    console.log("BODY: " + chunk);
	chunk = JSON.parse(chunk);
	aqi=chunk.breezometer_aqi
	if(aqi === undefined){
		console.log("= = = ");
	}
	if(typeof aqi === "undefined"){
		console.log("typeof");
	}
	if(aqi === undefined){
		console.log("= = = ");
	}
	console.log("Indice de Qualité : "+chunk.breezometer_aqi);
	console.log("Conseil : "+chunk.breezometer_description);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

/*


var texte = "@LO10Denis airQuality Caen";
var texteSplitte=texte.split(" ");
var indexVille = texteSplitte.indexOf("airQuality");
var city = texteSplitte[indexVille + 1];
console.log(city);	

*/