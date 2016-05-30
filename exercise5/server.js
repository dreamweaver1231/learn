var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname));

app.use('/api', (req, res, next) => {
  console.log("Hello Interceptor");
  next();
});

// This responds with "Hello World" on the homepage
app.get('/api', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
});

// This responds with "Hello UserName" on the homepage
app.get('/api/param/:name', function (req, res) {
  console.log("Got a GET request with a parameter");
  res.send(`Hello ${req.params.name}`);
});

// This responds with "Hello UserName" on the homepage
app.get('/api/query', function (req, res) {
  console.log("Got a GET request with a parameter");
  res.send(`Hello ${req.query.name}`);
});


// This responds a POST request for the homepage
app.post('/api', function (req, res) {
  console.log("Got a POST request with data in body");
  res.send(`Hello ${req.body.name}`);
});

// This responds a DELETE request for the /del_user page.
app.delete('/api/delete', function (req, res) {
  console.log("Got a DELETE request for /del_user");
  res.send('Hello DELETE');
});

// This responds a GET request for the /list_user page.
app.get('/api/list', function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send('Hello LIST');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/api/ab*cd', function(req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Hello PATTERN');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

});
