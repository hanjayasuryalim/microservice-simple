const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

posts = {}

app.get('/posts',(req,res) => {
    res.send(posts)
})

app.post('/events',(req,res) => {
    const type = req.body.type

    switch (type) {
        case "PostCreated":
            posts[req.body.postId] = {
                id: req.body.postId,
                title: req.body.title,
                comments: []
            }
            break;
        case "CommentCreated":
            posts[req.body.postId].comments.push({
                id:req.body.commentId,
                content: req.body.content
            })
            break;
        default:
            break;
    }

    res.send({})
})

app.listen(4002,() => {
    console.log('app running on port 4002...')
})

