console.log('Loaded!');

//counter code

var button = document.getElementById('counter');

button.onclick = function(){

	//create a request to the counter end point
	var request = new XMLHttpRequest();



	//capture the response and store in the variable
	request.onreadystatechange = function(){

		if(request.readyState === XMLHttpRequest.DONE){

			//take some action
			if(request.status === 200) {

				var counter = request.responseText;
				var span = document.getElementById('count');
				span.innerHTML = counter;
			}
		}



	};

	request.open('GET','http://localhost:8080/counter',true);
	request.send(null);
};




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

//submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function(){

//make a request to the server and send names

//capture a list of names and render it as list
var names = ['name1','name2','name3','name4'];
var list = '';
for (var i =0; i <names.length; i++) {
	list += '<li>' + names[i] + '</li>';
}
var ul = document.getElementById('namelist');
ul.innerHTML = list;
};