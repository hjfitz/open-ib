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
	photo: String,
	posted: {type: Date, default: Date.now}
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


module.exports = {Post, Comment}