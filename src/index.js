import ReactDOM from 'react-dom';

import App from './App';
import { MeetingProvider } from './context/MeetingContext';

ReactDOM.render(
	<MeetingProvider>
		<App />
	</MeetingProvider>,
	document.getElementById('root'),
);
