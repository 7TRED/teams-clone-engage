import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { AuthContext } from './context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import Loader from './components/Loader';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PreJoinPage from './pages/PreJoinPage';
import MeetingRoom from './pages/MeetingRoom';
import LandingPage from './pages/LandingPage';

function App () {
	const { restoreToken, isLoading, authState } = React.useContext(AuthContext);

	React.useEffect(() => {
		restoreToken();
	}, []);

	if (isLoading) {
		return (
			<div style={{ width: '100vw', height: '100vh' }}>
				<Loader open={true} />
			</div>
		);
	}

	return (
		<Router history={history}>
			<React.Fragment>
				<Header />

				{!authState.authToken ? (
					<Switch>
						<Route path="/" exact component={LandingPage} />
					</Switch>
				) : (
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/room/:id" exact component={PreJoinPage} />
						<Route path="/inroom/:id" exact component={MeetingRoom} />
					</Switch>
				)}
			</React.Fragment>
		</Router>
	);
}

export default App;
