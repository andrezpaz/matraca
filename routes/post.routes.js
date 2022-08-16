const express = require('express');
const router = express.Router();
const post = require('../models/post.model');
const m = require('../helpers/middlewares');

module.exports = router;

//All posts
router.get ('/', async (req,res) => {
    await post.getPosts()
.then(posts => res.json(posts) )
.catch(err => {
  if (err.status) res.status(err.status.json({ message: err.message}))
    else res.status(500).json({ message: err.message})
  })
})

//All posts queue emails
router.get ('/emailQueue', async (req,res) => {
    await post.getPostsEmail()
.then(posts => res.json(posts) )
.catch(err => {
  if (err.status) res.status(err.status.json({ message: err.message}))
    else res.status(500).json({ message: err.message})
  })
})

//post by id
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id= req.params.id

    await post.getPost(id)
    .then( post => res.json(post))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message})
        } else {
            res.status(500).json({ message: err.message})
        }
    })
})

//post by requester
router.get('/listRequester/:requester', async(req, res) =>{
    const requester = req.params.requester;
    await post.getPostsRequester(requester)
    .then( posts => res.json(posts))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({message: err.message})
        } else {
            res.status(500).json({message: err.message})
        }
    })
})

//insert new post
router.post('/', m.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
    .then( post => res.status(201).json({
        message: `The post #${post.id} has been created`,
        content: post
    }))
    .catch( err => res.status(500).json({ message: err.message}))
})

//inser new post to queue email
router.post('/email', m.checkFieldsPost, async (req, res) => {
    await post.insertPostEmail(req.body)
    .then( post => res.status(201).json({
        message: `the post #${post.id} has been add to queue email`,
        content: post
    }))
    .catch( err => res.status(500).json({ message: err.message}))
})

/* Update a post */
//router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
router.put('/:id', m.mustBeInteger, async (req, res) => { // to only update checked
    const id = req.params.id
    //await post.updatePost(id, req.body)
    await post.updatePostChecked(id, req.body)
    .then(post => res.json({
        message: `The post #${id} has been updated`,
        content: post
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})
  //res.render('receiver', { data: data });
