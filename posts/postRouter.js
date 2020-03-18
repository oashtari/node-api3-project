const express = require('express');

const router = express.Router();

const db = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({ message: "could not get posts" }))
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

