const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.time)
  const method = req.method;
  const endpoint = req.originalURL;
  const time = Date.now();
  console.log(`Method: ${method}, URL: ${endpoint}, Timestamp: ${time}`);
  next();
}


module.exports = server;
