import adapter from 'webrtc-adapter';
import ReactDOM from 'react-dom';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MeetingProvider } from './context/MeetingContext';
import { RoomProvider } from './context/RoomContext';

ReactDOM.render(
	<AuthProvider>
		<MeetingProvider>
			<RoomProvider>
				<App />
			</RoomProvider>
		</MeetingProvider>
	</AuthProvider>,
	document.getElementById('root'),
);
