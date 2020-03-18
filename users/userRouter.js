const express = require('express');

const router = express.Router();

const db = require('./userDb');
const postDb = require('../posts/postDb');
// get,
// getById,
// getUserPosts,
// insert,
// update,
// remove,

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const { name } = req.body;
  console.log(req.body);

  db.insert({ name: name })
    .then(user => { res.status(201).json(user) })
    .catch(error => {
      res.status(500).json({ message: "could not add user to database" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;

  postDb.insert({ user_id: id, text: req.body.text })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: "was not able to add post to postDb" })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(users => {
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: "No users for you" })
      }
    })
})


router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});


router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.user.id;

  db.getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({ message: "this user does not have any posts" })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "unable to retrieve posts from this user" })
    })

});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.user.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(error => {
      res.status(500).json({ message: "was not able to delete this user" })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const id = req.user.id;

  db.update(id, { name: req.body.name })
    .then(() => {
      db.getById(id)
        .then(user => {
          res.status(200).json(user)
        })
        .catch(error => {
          res.status(500).json({ error: "could not get updated user" })
        })
    })
    .catch(error => {
      res.status(500).json({ error: "could not update this user" })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next()
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
}


function validateUser(req, res, next) {
  // do your magic!
  // const userInfo = req.body;

  if (req.body) {
    if (req.body.name) {
      next()
    } else {
      res.status(400).json({ message: "missing required name field" })
    }
  } else {
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" })
    }
  } else {
    res.status(400).json({ message: "missing post data" })
  }
}

module.exports = router;

