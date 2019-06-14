import React, {Component} from 'react'
import { api } from './shared';

class Thread extends Component {
	async componentDidMount() {
		console.log(this.props)
		const {id} = this.props.match.params
		const {data} = await api.get(`/thread/${id}`)
		console.log(data)
	}
	render() {
		return <h1>Thread</h1>
	}
}

export default Thread