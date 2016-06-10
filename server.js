'use strict';

var moment = require('moment');
var express = require('express');


var app = express();


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});



app.get('/:datestring', function(req, res){
	var theDate;
	if(/^\d{8,}$/.test(req.params.datestring)){
		theDate = moment(req.params.datestring, "X");
	}else {
		theDate = moment(req.params.datestring, "MMMM-D-YYYY");
	}
	
	
	if(theDate.isValid()){
		res.json({
			unix: theDate.format("X"),
			natural: theDate.format("MMMM D, YYYY")
			});
	}else{
		res.json({
			unix: null,
			natural: null
		});
	}
});












var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});