const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ Server: 'Running' })
});

//custom middleware

// function logger(req, res, next) {
//   console.log(req.time)
//   const method = req.method;
//   const endpoint = req.originalURL;
//   const time = Date.now();
//   console.log(`Method: ${method}, URL: ${endpoint}, Timestamp: ${time}`);
//   next();
// }

server.use(`/api/users`, userRouter);
server.use(`/api/posts`, postsRouter)

module.exports = server;
