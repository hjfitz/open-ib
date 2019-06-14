const api = require('express').Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('successfully connected to mongo')
});

const commentSchema = new mongoose.Schema({
	author: {type: String, default: 'Anonymous'},
	body: {type: String, required: true},
})
const Comment = mongoose.model('comment', commentSchema)

const postSchema = new mongoose.Schema({
	title: String,
	author: {type: String, default: 'Anonymous', required: true},
	// board: {type: String, required: true}, // of the form /g/, /b/
	body: {type: String, required: true},
	photo: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: Comment}],
	posted: {type: Date, default: Date.now},
})

const Post = mongoose.model('post', postSchema)


// get all posts
api.get('/threads', async (req, res) => {
	const threads = await Post.find().limit(10).sort({posted: -1})
	res.json(threads)
})

// create a thread
api.post('/thread', async (req, res) => {
	// b64encphoto and store?
	const {title, author, body, photo} = req.body
	const newPost = new Post({
		title,
		author: author || 'Anonymous', // todo: figure out why mongoose default is fucked
		body,
		comments: [],
		photo,
	})
	try {
		await newPost.save()
		console.log('inserted')
		res.status(200).send('success')
	} catch (err) {
		res.status(400).send(err.message)
	}
		
})

// create a comment
api.post('/thread/:id', (req, res) => {
	const {name, comment} = req.body

})

// get a specific post
api.get('/thread/:id', async (req, res) => {
	const {id} = req.params
	const threadInfo = await Post.findById(req.params.id)
	res.json(threadInfo)

})

module.exports = api