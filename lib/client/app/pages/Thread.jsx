import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import {api, formatDate, imageToB64} from './shared';

// todo:
//// - display thread information
// - show comment box
// - upload comments
// - fetch all comments
// - ensure on homepage all comments aren't retrieved

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

		console.log(payload)

		const resp = await api.post(`/thread/${this.state._id}`, payload)
		await this.fetchThread()
	}

	fetchThread = async () => {	
		const {id} = this.props.match.params
		const {data} = await api.get(`/thread/${id}`)
		console.log('[thread data]:', data)
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
					<figure className="thread-image">
						<img src={this.state.photo}/>
					</figure>
					<aside className="thread-content">
					<header>
							<h3>
								<span className="thread-content-author">{this.state.author}</span>
								<span className="thread-content-title">{this.state.title}</span>
								{this.state.posted} 
								ID.<Link to={`/thread/${this.state._id}`}>{this.state._id}</Link>
								</h3>
						</header>
						{this.state.body}
					</aside>
				</section>
				<section className="comments">
					{this.state.comments.map((comment => {
						// author, body, photo
						const img = comment.photo ? (
							<aside>
								<figure className="comment-image">
									<img src={comment.photo}/>
								</figure>
							</aside>
						) : ''
						return (
						<div className="comments-comment" key={comment._id} id={comment._id}>
							{img}
						<header>
							<h3>
								<span className="thread-content-author">{comment.author}</span>
								{this.state.posted} 
								ID.<Link to={`/thread/${this.state._id}#${comment._id}`}>{this.state._id}</Link>
								</h3>
						</header>
						{<pre>{comment.body}</pre>}
						
						</div>)
					}))}
				</section>

			</>)
	}
}

export default Thread