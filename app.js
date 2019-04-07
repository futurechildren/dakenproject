var http = require('http'),
	fs = require('fs'),
	ejs = require('ejs'),
	qs = require('querystring');

var pg = require('pg');
var async = require('async');

var connectString = "tcp://dakensya:dakensya@hondanadb.cnefcdnnaksl.us-west-2.rds.amazonaws.com:5432/hondanaDB";

var setting = require('./setting');
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public_html/bbs.ejs','utf-8');

function renderForm(posts,res){
	var data = ejs.render(template,{
		posts:posts
	});
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(data);
	res.end();	
};

var posts = [];

server.on('request',function(req,res){
	if(req.method === 'POST'){
		req.data = "";
		req.on("readable",function(){
			req.data += req.read();
		});
		req.on("end",function(){
			var query = qs.parse(req.data);
			posts.push(query.name);
			renderForm(posts,res);
		});
	}else{
		renderForm(posts,res);
	}
})
server.listen(setting.port);
console.log("server listening...");

