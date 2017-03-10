console.log('Loaded!');






var main = function ()
{

	$('.menu-icon').click(function()
	{
		$('.menu').animate(
			{
				left : '0px'
			},200);

		$('body').animate({

				left: '285px'	

			},200);	



	});

	$('.icon-close').click(function()
	{

		$('.menu').animate(
			{
				left : '-285px'
			},200);

		$('body').animate({

				left: '0px'	

			},200);	


	});
};



$(document).ready(main);

//submit username and password

var submit = document.getElementById('submit_btn');

if (submit !== null){

submit.onclick = function(){

	//create a request to the counter end point
	var request = new XMLHttpRequest();



	//capture the response and store in the variable
	request.onreadystatechange = function(){

		if(request.readyState === XMLHttpRequest.DONE){

			//take some action
			if(request.status === 200) {

				console.log('User logged in');
				alert('logged in successfully');
			}else  if (req.status === 403)
			{
			    alert('username/password is incorrect');
			}else if(req.status === 500){
			    
			    alert('Something went wrong on the server');
			}
		}

		

	};
    var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	console.log(username);
	console.log(password);
		request.open('POST','http://raulster24.imad.hasura-app.io/login', true);
		request.setRequestHeader('Content-Type','application/json');
		request.send(JSON.stringify({username:username,password:password}));

};

}

//submit comments 

var commentInput = document.getElementById('textarea');
var commentButton = document.getElementById('submit_com');
commentButton.onclick = function(){

	var request = new XMLHttpRequest();



	//capture the response and store in the variable
	request.onreadystatechange = function(){

		if(request.readyState === XMLHttpRequest.DONE){

			//take some action
			if(request.status === 200) {

				var comments = request.responseText;
				comments = JSON.parse(comments);
				var list = '';
				for (var i =0; i <comments.length; i++) {
					list += '<li>' + comments[i] + '</li>';
				}
				var ul = document.getElementById('Commentslist');
				ul.innerHTML = list;
			}
		}

	};
		var comment = commentInput.value;
		request.open('GET','http://raulster24.imad.hasura-app.io/submit-comment?comment=' + comment, true);
		request.send(null);
	
};

		




/*submit.onclick = function(){

//make a request to the server and send names

//capture a list of names and render it as list
var names = ['name1','name2','name3','name4'];
var list = '';
for (var i =0; i <names.length; i++) {
	list += '<li>' + names[i] + '</li>';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
};*/
