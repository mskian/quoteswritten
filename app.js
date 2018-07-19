'use strict';

const express = require('express'); // import express js library
const app = express(); //create express js instance 

    // Start Port
    app.listen(8000,() => {
      console.log(`application is running at: http://localhost:8000`);
    });
  
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

// Express Functions
app.get('/random', function (req, res) {
    var quotesContent = require('./quoteswritten.json');
    var random = quotesContent.quoteswritten[Math.floor(Math.random() * quotesContent.quoteswritten.length)];
    res.send(random.quotes)
    });
  
    app.get('/api/all', function (req, res) {
      var data = require('./quoteswritten.json');
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(data));
      });
