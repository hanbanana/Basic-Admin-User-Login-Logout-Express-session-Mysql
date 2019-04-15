var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'loginnode'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/logout', function(req, res, next) {
	if (req.session) {
	  // delete session object
	  req.session.destroy(function(err) {
		if(err) {
		  return next(err);
		} else {
		  return res.redirect('/');
		}
	  });
	}
  });

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username === 'user1' && password === 'user1') {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/userPage');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
		
	} 

	else if (username === 'admin1' && password === 'admin1') {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/adminPage');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
		
	}

	else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/userPage', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname, 'userPage.html'));
	} else {
		response.send('Please login to view this page!');
	}

});

app.get('/adminPage', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname, 'adminPage.html'));
	} else {
		response.send('Please login to view this page!');
	}

});

app.listen(3000, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: Port 3000");
});