const express = require('express');
const axios = require('axios');
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts', async (req, res) => {
    const { title } = req.body
    const id = randomBytes(4).toString('hex')

    posts[id] = {
        id,title
    }

    await axios.post('http://localhost:4005/events',{
        type:"PostCreated",
        postId: id,
        title
    })
    res.status(201).send(posts);
})

app.post('/events',(req,res) => {
    console.log(req);

    res.send({});
})

app.listen(4000, () => {
    console.log('app running on port 4000...')
})