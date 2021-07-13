import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { AuthContext } from './context/AuthContext';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PreJoinPage from './pages/PreJoinPage';
import MeetingRoom from './pages/MeetingRoom';
import LandingPage from './pages/LandingPage';
import InRoomLoadPage from './pages/InRoomLoadPage';
import Loader from './components/Loader';
import OnDisconnectPage from './pages/OnDisconnectPage';

function App () {
	const { authState, isLoading, restoreToken } = React.useContext(AuthContext);
	const [ isfetchingToken, setIsFetchingToken ] = React.useState(true);

	React.useEffect(() => {
		setIsFetchingToken(true);
		setTimeout(async () => {
			await restoreToken();
			setIsFetchingToken(false);
		}, 1000);
	}, []);

	if (isfetchingToken) {
		return <Loader open />;
	}

	return (
		<Router history={history}>
			<Header />
			<Switch>
				{!authState.authToken ? (
					!isLoading && <Route path="/" component={LandingPage} />
				) : (
					<React.Fragment>
						<Route path="/" exact component={HomePage} />
						<Route path="/room/:id" exact component={PreJoinPage} />
						<Route path="/inroomload/:id" exact component={InRoomLoadPage} />
						<Route path="/inroom/:id" exact component={MeetingRoom} />
						<Route path="/outroom/:id" exact component={OnDisconnectPage} />
					</React.Fragment>
				)}
			</Switch>
		</Router>
	);
}

export default App;
