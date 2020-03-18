const express = require('express');

const router = express.Router();

const db = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(posts => res.status(200).json(posts))
    .catch(error => {
      res.status(500).json({ message: "could not get posts" })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  db.remove(id)
    .then(() => {
      res.status(200).json(req.post)
    })
    .catch(error => {
      res.status(500).json({ message: "was not able to delete this post" })
    })

});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.post.id;
  console.log(req.post.id)
  db.update(id, { text: req.body.text })
    .then(() => {
      res.status(200).json({ text: req.body.text })
    })
    .catch(error => {
      res.status(500).json({ error: "could not update this post" })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  db.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" })
      }
    })
    .catch(error => { res.status(500).json({ message: "could not validate this post id" }) })
}

module.exports = router;

