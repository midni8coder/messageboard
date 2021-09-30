
const cors = require('cors'); 
const User = require('./models/user')
var sql = require("mssql");
var express = require("express");
const { response } = require('express');
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var config = {
    user: 'admin',
    password: 'pass@word1',
    server: 'localhost\\SQLEXPRESS', 
    database: 'localdb' 
};

var messages=[{text:'sample',owner:"john"},{text:'sample2',owner:"david"}];
app.get("/messages",(req,res) => {
    res.send(messages);
})
app.get("/users",(req,res) => {
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from [User] order by 1 desc', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
})
app.post("/users",(req,res)=>{
    let user = {...req.body};
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        request.input('UserName', sql.VarChar(500), user.UserName);
        request.input('Email', sql.VarChar(500),  user.Email);
        request.execute('usp_SaveUser').then(function(err, recordsets, returnValue, affected) {
            if (err) console.log(err)
            res.end(recordsets);
        }).catch(function(err) {
          console.log(err);
        });
    });
});
app.put("/users",(req,res)=>{
    let user = {...req.body};
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        request.input('UserName', sql.VarChar(500), user.UserName);
        request.input('Email', sql.VarChar(500),  user.Email);
        request.input('UserId', sql.VarChar(500),  user.UserId);
        request.execute('usp_UpdateUser').then(function(err, recordsets, returnValue, affected) {
            if (err) console.log(err)
            res.end(recordsets);
        }).catch(function(err) {
          console.log(err);
        });
    });
})
app.get("/users/:UserId",(req,res) => {
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from [User] where UserId='+req.params.UserId, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
})


app.listen(8888);
