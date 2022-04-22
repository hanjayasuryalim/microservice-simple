const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const commentId = randomBytes(4).toString('hex');

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({"id": commentId, "content":content})
    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        postId: req.params.id,
        commentId,
        content
    })

    res.status(201).send(commentsByPostId)
})

app.post('/events',(req,res)=> {
    console.log(req);

    res.send({})
})

app.listen(4001,() => {
    console.log('app running on port 4001...')
})