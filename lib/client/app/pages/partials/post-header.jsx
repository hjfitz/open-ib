import React from 'react'
import {Link} from 'react-router-dom'

const PostHeader = (props) => (
	<>
		<figure className={`${props.type}-image`}>
			<img src={props.photo}/>
		</figure>
		<aside className={`${props.type}-content`}>
		<header>
				<h3>
					<span className={`${props.type}-content-author`}>{props.author}</span>
					<span className={`${props.type}-content-title`}>{props.title}</span>
					{props.posted} 
					<Link to={`/thread/${props._id}`}>{`ID. ${props._id}`}</Link>
					</h3>
			</header>
			{props.body}
		</aside>
	</>
)

export default PostHeader
