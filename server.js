var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {


	'article-one': {
			title: 'Article one | Raulster24',
			heading:'Article One',
			date:'19th February, 2017',
			content:`<p>
         		This is content for my first article. This is content for my first article. This is content for my first article. 
         		This is content for my first article. This is content for my first article. This is content for my first article. 
         		This is content for my first article. This is content for my first article. This is content for my first article. 
     		</p>
     		<p>
         	This is content for my first article. This is content for my first article. This is content for my first article. 
         	This is content for my first article. This is content for my first article. This is content for my first article. 
         	This is content for my first article. This is content for my first article. This is content for my first article. 
     		</p>
     		<p>
         	This is content for my first article. This is content for my first article. This is content for my first article. 
         	This is content for my first article. This is content for my first article. This is content for my first article. 
         	This is content for my first article. This is content for my first article. This is content for my first article. 
     		</p>`
     	},

	'article-two': {
			title: 'Article two | Raulster24',
			heading:'Article Two',
			date:'19th February, 2017',
			content:`<p>
				This is content for my second article.This is content for my second article.This is content for my second article.
				This is content for my second article.This is content for my second article.This is content for my second article.
				This is content for my second article.This is content for my second article.This is content for my second article.
			 </p>`
			},

	'article-three': {
			title: 'Article Three | Raulster24',
			heading:'Article Three',
			date:'19th February, 2017',
			content:`<p>
				This is content for my third article.This is content for my third article.This is content for my third article.
				This is content for my third article.This is content for my third article.This is content for my third article.
				This is content for my third article.This is content for my third article.This is content for my third article.
			 </p>`}	

};

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
			<meta name = "viewport" content="width=device-width, initial-scale=1"/>
		 </head>
		 
		 <body>
			<div class="container1">
			 <div>
				 <a href = "/">Home</a>
			 </div>
			 <hr/>
			 <h3>
				 ${heading} 
			 </h3>
			 <div>
				 ${date}
			 </div>
			 ${content}
			 </div>
			 
			 <div class = "comment">
			 <hr/>
			 <h3>Comments</h3>
			 <textarea class="textarea" rows="10" cols="100" name="comment" placeholder ="enter comments here"></textarea>
			 </div>


		 </body>
		</html>
         `;
		 
		 return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function(req,res){
	counter = counter + 1;
	res.send(counter.toString());
});

app.get('/:articleName', function (req,res){
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
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
var names = []; 
app.get('/submit-name/:name', function(req,res){
	//get the name from the request
	var name = req.params.name;
	names.push(name);
	res.send(names);

});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
