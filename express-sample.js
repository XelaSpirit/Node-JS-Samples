/*
Author: Alex Morse
Date created: 6 / 29 / 2020
Description: A simple API server sample using Express that I made to help me learn how to use it for my COP4331 large project.

This was made by taking only the absolutely necessary components from the sample project provided by Rick Leinecker - the professor of my COP4331 class.
The descriptions of how each component works were gathered from my own tests as well as the express API reference.
See https://expressjs.com/en/5x/api.html for the full api reference.
Also see https://expressjs.com/en/guide/routing.html for a more in-depth guide to using Express for an API server.
(I found the route parameters, app.route(), and express.Router to be pretty interesting for my project, but thought it was too much for a bare-bones sample project).

To use this project, you must install the following packages:
	* express
	* cors
*/

//Express - the package for creating an api server with node.js
const express = require('express');
//Parses the body of requests coming into the server. This is what allows you to use req.body
const bodyParser = require('body-parser');
//cors enables CORS with various operations with Express
//https://expressjs.com/en/resources/middleware/cors.html
//https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
const cors = require('cors');

//Create express app
const app = express();
//Enable CORS
app.use(cors());
//Use JSON. All requests will have req.body set to a JSON object parsed from the body of the request thanks to body-parser
app.use(bodyParser.json());

//This creates a new POST api endpoint at /api/postTest
//This would be called from a website/app with a POST opeation sent to <server-url>/api/postTest
//See https://expressjs.com/en/5x/api.html#app.post.method for more information
app.post("/api/postTest",  async (req, res, next) => {
	//req.body contains the JSON object sent as part of the request
	console.log(req.body);

	//Construct a JSON object to return to the client who sent the request
	var ret = {message:"Done"};
	//Res is used for sending messages back to the client
	//Status 200 is for OK and json is used to send a JSON object
	//I found status codes to be somewhat interesting. See https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html for more info on different status codes.
	res.status(200).json(ret);
})

//This creates a new GET api endpoint at /api/getTest
//This would be called from a website/app with a GET operation sent to <server-url>/api/getTest
//(GET requests are also what happens when you go to a URL. so <server-url>/api/getTest would also be a valid website, so returning HTML would allow this url to generate a proper web page)
//Remember in a GET request req.body doesn't exist.
//Route parameters could still be used to get dynamic information from the client to the server, but that is out of the scope of this sample program.
//For more information on request types, see https://www.w3schools.com/tags/ref_httpmethods.asp
app.get("/api/getTest", async (req, res, next) => {
	var ret = {message:"Done"};
	res.status(200).json(ret);
})

//Required header information for your server.
//I'm not gonna bother figuring out what exactly it all means - google it if you're interested.
//For COP4331 purposes, this will always be the same for any project's server.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//Starts your server on port 5000
app.listen(5000, () => {
  console.log(`Server listening on port 5000.`);
});
