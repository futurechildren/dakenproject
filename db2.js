var pg = require('pg');

var conString = "tcp://dakensya:dakensya@pg.cnefcdnnaksl.us-west-2.rds.amazonaws.com:5432/hondanaDB";

var queryString = (function () {/*
  SELECT ID, NAME FROM COMPANY
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

console.log("aaa");

exports.handler = function(event, context){
  console.log("trying to connect...");
  pg.connect(conString, function(err, client) {
    if(err) {
      console.log('>> Could not connect to postgresql.', err);
      context.fail(err);
      return;
    }
    console.log(">> Connected.");
    client.query(queryString, function(err, result) {
      if(err) {
        console.log('error running query', err);
        context.fail(err);
        return;
      }
      var jsonResult = JSON.stringify( result );
      console.log(">>> successful query. jsonResult: " +  jsonResult);
      client.end();
      context.succeed(result["rows"]);
    });
  });
}