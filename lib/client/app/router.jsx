import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'

import {Main, Thread} from './pages'

const entry = document.querySelector('[react-root]')

const app = (
	<BrowserRouter>
		<Route path="/thread/:id" component={Thread} />
		<Route exact path="/" component={Main} />
	</BrowserRouter>
)

render(app, entry)