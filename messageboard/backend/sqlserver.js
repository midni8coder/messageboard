var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'admin',
        password: 'pass@word1',
        server: 'localhost\\SQLEXPRESS', 
        database: 'localdb' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from [User]', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});