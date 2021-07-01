import ReactDOM from 'react-dom';

import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { RoomProvider } from './context/RoomContext';
import { LocalMediaProvider } from './context/LocalMediaContext';

const VideoApp = () => {
	return (
		<LocalMediaProvider>
			<RoomProvider>
				<App />
			</RoomProvider>
		</LocalMediaProvider>
	);
};

ReactDOM.render(
	<Provider store={store}>
		<VideoApp />
	</Provider>,
	document.getElementById('root'),
);
