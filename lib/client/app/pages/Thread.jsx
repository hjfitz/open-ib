import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import {api, formatDate, imageToB64} from './shared';
import Comment from './partials/comment'
import PostHeader from './partials/post-header'


class Thread extends Component {
	state = {
		author: 'Anonymous',
		comments: [],
		title: 'Loading',
		body: 'Loading',
		photo: 'Loading',
		posted: formatDate(Date.now()),
		_id: this.props.match.params.id,
	}

	commentThread = async () => {
		const payload = {
			author: this.commentAuthor.value,
			body: this.commentBody.value,
			photo: this.commentImg.files.length ? await imageToB64(this.commentImg.files[0]) : null
		}

		const resp = await api.post(`/thread/${this.state._id}`, payload)
		await this.fetchThread()
	}

	fetchThread = async () => {	
		const {id} = this.props.match.params
		const {data} = await api.get(`/thread/${id}`)
		this.setState({
			author: data.author,
			body: data.body,
			title: data.title,
			comments: data.comments,
			photo: data.photo,
			posted: formatDate(data.posted),
		})
	}


	componentDidMount() {
		this.fetchThread()
	}

	render() {
		return (
			<>
				<section className="create-comment">
					<form action="#" className="post-thread">
						<input type="text" placeholder="Name" id="comment-author" ref={a => this.commentAuthor = a}/>
						<textarea name="comment-body" id="comment-body" cols="30" rows="10" ref={c => this.commentBody = c} />
						<input type="file" name="comment-image" id="comment-image" ref={i => this.commentImg = i}/>
						<a href="#" onClick={this.commentThread}>Comment</a>
					</form>
				</section>

				<section className="thread">
					<PostHeader {...this.state} type="thread" />
				</section>

				<section className="comments">
					{this.state.comments.map(comment => 
						<Comment {...comment} threadID={this.state._id} key={comment._id} />
					)}
				</section>

			</>)
	}
}

export default Thread