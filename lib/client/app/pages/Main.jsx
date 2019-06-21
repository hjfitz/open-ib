import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {api, formatDate, imageToB64} from './shared'
import PostHeader from './partials/post-header';


class Main extends Component {
	state = {threads: []}

	populate = async () => {
		const {data: threads} = await api.get('/threads')
		this.setState({threads}, () => console.log('updated'))
	}

	async componentDidMount() {
		this.populate()
	}

	renderThreads() {
		return this.state.threads.map((thread) => (
			<section className="thread" key={thread._id}>
				<PostHeader {...thread} type="thread" />
			</section>
		))
	}

	postThread = async (ev) => {
		ev.preventDefault()
		try {
			await api.post('/thread', {
				title: this.postTitle.value,
				author: this.postAuthor.value,
				body: this.postComment.value,
				photo: await imageToB64(this.postImg.files[0])
			})
			console.log('inserted correctly')
			this.populate()
		} catch (err) {
			console.log(err)
		}
	}

	
	render() {
		return (
			<main>
				<header>
					<h1>Home</h1>
				</header>
				<section className="create-post">
					<form action="#" className="post-thread">
						<input type="text" placeholder="Title" id="post-title" ref={t => this.postTitle = t}/>
						<input type="text" placeholder="Name" id="post-author" ref={a => this.postAuthor = a}/>
						<textarea name="post-comment" id="post-comment" cols="30" rows="10" ref={c => this.postComment = c} />
						<input type="file" name="post-image" id="post-image" ref={i => this.postImg = i}/>
						<a href="#" onClick={this.postThread}>Post</a>
					</form>
				</section>
			{this.renderThreads()}
			</main>
		)
	}
}

export default Main