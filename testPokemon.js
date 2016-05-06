
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

  res.on("data", function(chunk) {
    console.log("BODY: " + chunk);
	
	//console.log("Pokemon Name : "+chunk.name);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});