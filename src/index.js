import ReactDOM from 'react-dom';

import App from './App';
import { MeetingProvider } from './context/MeetingContext';
import { RoomProvider } from './context/RoomContext';

ReactDOM.render(
	<MeetingProvider>
		<RoomProvider>
			<App />
		</RoomProvider>
	</MeetingProvider>,
	document.getElementById('root'),
);
