import React from 'react';
import { Button, TextField } from '@material-ui/core';

import history from '../../history';
import { MeetingContext } from '../../context/MeetingContext';

function JoinMeetingButton () {
	const [ roomID, setRoomID ] = React.useState('');
	const { isValidRoom } = React.useContext(MeetingContext);

	const handleOnClick = async () => {
		// const res = await isValidRoom(roomID);
		// if (res) {
		// 	history.push(`/room/${roomID}`);
		// } else {
		// 	return;
		// }
		// history.push(`/room/${roomID}`);
	};

	return (
		<React.Fragment>
			<div
				style={{
					display : 'flex',
					flex    : 1,
				}}
			>
				<Button variant="contained" color="primary" onClick={handleOnClick}>
					Join New Meeting
				</Button>
			</div>
		</React.Fragment>
	);
}

export default JoinMeetingButton;
