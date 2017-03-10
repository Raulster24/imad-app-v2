var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');


app.use(morgan('combined'));
app.use(bodyParser.json());

var config = {
    
    user: 'raulster24',
    database: 'raulster24',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
}

var pool = new Pool(config);


function createTemplate (data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
var htmltemplate = `
		<html>
		 <head>
			<title>
				${title}
			</title>
			<link href="/ui/style.css" rel="stylesheet" />
			<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
			<meta name = "viewport" content="width=device-width, initial-scale=1"/>
		 </head>
		 
		 <body>
			<div class="container1">
			 <div>
				 <b><a href = "/">Home</a></b>
			 </div>
			 <hr/>
			 <h3>
				 ${heading} 
			 </h3>
			 <div>
				 ${date.toDateString()}
			 </div>
			 ${content}
			 </div>
			 
			 <div class = "comment">
			 <hr/>
			 <h3>Comments</h3>
			 <textarea class="textarea" rows="10" cols="100" name="comment" id ="textarea" placeholder ="Enter your comments here and press submit button"></textarea>
			 <input class = "commentbutton" type = "button"  id="submit_com" value = "Submit"></input>
			 <ul class ="commentlist" id="Commentslist">
			 <li>Your comments will display here after submit</li>
			 </ul>
			 </div>

			 <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>	
			 <script src="/ui/main.js"></script>
		 </body>
		</html>
         `;
		 
		 return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req,res){
    
    var hashedString = hash(req.params.input, 'this is some random string');
    res.send(hashedString);
    
});

app.post('/create-user', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
 
 var salt = crypto.RandomBytes(128).toString('hex');
 var dbString = hash(password,salt);
 pool.query('INSERT INTO "user" (username, password) VALUES($1, $2)', [username, dbString], function(err,result){
     
     if(err){
            
            res.status(500).send(err.toString());
            
        }
        else {
            res.send('User Successfully created: ' + username);
        }
     
 });
    
});

app.get('/test-db', function(req,res) {
    
    //make a select request
    pool.query('SELECT * FROM test', function(err,result){
        
        if(err){
            
            res.status(500).send(err.toString());
            
        }
        else {
            res.send(JSON.stringify(result.rows));
        }
        
    });
    
    //respond with a result
    
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi1.png'));
});

var counter = 0;
app.get('/counter', function(req,res){
	counter = counter + 1;
	res.send(counter.toString());
});

var names = []; 
app.get('/submit-name', function(req,res){
	//get the name from the request
	var name = req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));

});

var comments = []; 
app.get('/submit-comment', function(req,res){
	//get the name from the request
	var comment = req.query.comment;
	comments.push(comment);
	res.send(JSON.stringify(comments));

});


app.get('/articles/:articleName', function (req,res){
	var articleName = req.params.articleName;
	
	pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
	    
	    if (err){
	        
	        res.status(500).send(err.toString());
	    }
	    else{
	        if(result.rows.length === 0)
	        {
	            res.status(404).send('Article not found');
	        }
	        else {
	            
	            var articleData = result.rows[0];
	            	res.send(createTemplate(articleData));
	        }
	    }
	});

});


app.get('/ui/main.js', function(req, res) {
	res.sendFile(path.join(__dirname,'ui','main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



 app.get('/ui/madi1.png', function(req, res){
	 res.sendFile(path.join(__dirname, 'ui', 'madi1.png'));
	});

app.get('/ui/giphy.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'giphy.gif'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
