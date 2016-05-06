/*

var $ = require ("jquery");


$.get("http://quotes.rest/quote.json?maxlength=100", function (data){
	
	console.log(data);
	
} );


function testGet(){
	console.log("Début fonction");
    $.get('http://quotes.rest/quote.json?maxlength=100',  function(data){
        var prettyObject = JSON.parse(data);
        console.log(prettyObject);
		console.log("test");
    });
};

testGet();



var express = require ("express");
var app = express();

app.get('http://quotes.rest/quote.json?maxlength=100', function(request, response){
	console.log("Here !");
	console.log(response);
});


*/




var http = require('http');
var options = {
  host: 'itunes.apple.com',
  port: 80,
  path: '/search?term=Harry%20Potter'
};
http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
    console.log("BODY: " + chunk);
	console.log("here");
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});



/*
var http = require('http');




//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {	
  //host: 'www.random.org',
  //path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  host: 'quotes.rest',
  path: '/quote.json?maxlength=100'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
	console.log("dataOK");
	});

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
	console.log("COol");
  });
}

http.request(options, callback).end();



*/

/*
var https=require('https');

https.get('https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  //console.log(res);
  res.resume();
}).on('error', (e) => {
  conso
  
  
  */
