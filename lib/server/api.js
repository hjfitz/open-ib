const api = require('express').Router()
const {Post, Comment} = require('./db')


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
api.post('/thread/:id', async (req, res) => {
	const {author, body, photo} = req.body
	const {id} = req.params
	const threadInfo = await Post.findById(id).populate('comments')
	const newComment = new Comment({author, body, photo})
	await newComment.save() // test this async
	threadInfo.comments.push(newComment)
	await threadInfo.save() // test this async
	res.send(200)

})

// get a specific post
// todo: turn comments in to a stream [0, 1] as images are attached
// [0] https://stackoverflow.com/questions/48619223/nodejs-express-stream-from-array
// [1] https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
api.get('/thread/:id', async (req, res) => {
	const {id} = req.params
	const threadInfo = await Post.findOne({_id: id}).lean().populate('comments')
	const newComments = await Promise.all(threadInfo.comments.map(elem => Comment.findById(elem).lean()))
	threadInfo.comments = newComments
	res.json(threadInfo)

})

module.exports = api