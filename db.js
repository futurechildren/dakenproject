var pg = require('pg');
var async = require('async');


var connectString = "tcp://dakensya:dakensya@hondanadb.cnefcdnnaksl.us-west-2.rds.amazonaws.com:5432/hondanaDB";

function randomInt(low,high){
	return Math.floor(Math.random() * (high - low + 1) + low);
}

pg.connect(connectString, function(err, client) {
    if (err) {
        console.log('Connection Error:', err);
        throw err;
    } else {
        var counter = [];
        for (var i = 0; i < 1000; i++) {
          counter[i] = i;
        }
        async.eachSeries(counter, function(i, next) {
            var qs = "INSERT INTO  t_dummy (id, age) VALUES("
                        + "'" + "user-" + (i+1) + "', "
                        + randomInt(10, 90) + ");"
            console.log("qs=" + qs);

            client.query(qs, function(err, result) {
                if(err) {
                    console.log('Insert Error! :' + (i+1));
                    throw err;
                } else {
                };
            });
            console.log('Inserted : ' + (i+1));
            next();

        }, function(err) {
            console.log('Finished!');
            client.on('drain', client.end.bind(client));
        });
    }
});