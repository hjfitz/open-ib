import React from 'react'
import {Link} from 'react-router-dom'

const CommentImg = ({src}) => (
	<aside>
		<figure className="comment-image">
			<img src={src} alt=""/>
		</figure>
	</aside>
)

const CommentHeader = props => (
	<header>
		<h3>
			<span className="thread-content-author">{props.author}</span>
			<Link to={`/thread/${props.threadID}#${props._id}`}>{`ID. ${props._id}`}</Link>
		</h3>
	</header>
)

const Comment = props => {
	const img = props.photo ? <CommentImg src={props.photo} /> : ''
	return (
		<div className="comments-comment" id={props._id}>
			{img}
			<div className="comment-body">
				<CommentHeader {...props} />
				<pre>{props.body}</pre>
			</div>
		</div>
	)
}

export default Comment
