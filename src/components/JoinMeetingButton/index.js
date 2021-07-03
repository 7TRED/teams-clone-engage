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

		history.push(`/room/${roomID}`);
	};

	return (
		<React.Fragment>
			<div
				style={{
					display : 'flex',
					flex    : 1,
				}}
			>
				<TextField label="Meeting ID" variant="outlined" onChange={(e) => setRoomID(e.target.value)} value={roomID} />
				<Button variant="contained" color="primary" size={'large'} onClick={handleOnClick}>
					Join
				</Button>
			</div>
		</React.Fragment>
	);
}

export default JoinMeetingButton;
