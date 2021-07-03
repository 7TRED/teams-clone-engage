import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PreJoinPage from './pages/PreJoinPage';
import MeetingRoom from './pages/MeetingRoom';

function App () {
	return (
		<Router history={history}>
			<React.Fragment>
				<Header />
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/room/:id" exact component={PreJoinPage} />
					<Route path="/inroom/:id" exact component={MeetingRoom} />
				</Switch>
			</React.Fragment>
		</Router>
	);
}

export default App;
