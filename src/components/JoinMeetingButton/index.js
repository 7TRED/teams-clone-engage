import React from 'react';
import { Button, TextField } from '@material-ui/core';
import history from '../../history';

function JoinMeetingButton () {
	const [ roomID, setRoomID ] = React.useState('');
	const handleOnClick = () => {};

	return (
		<div
			style={{
				display : 'flex',
				flex    : 1,
			}}
		>
			<TextField label="Meeting ID" variant="outlined" onChange={(e) => setRoomID(e.target.value)} value={roomID} />
			<Button variant="contained" color="primary" size={'large'} onClick={() => history.push(`/room/${roomID}`)}>
				Join
			</Button>
		</div>
	);
}

export default JoinMeetingButton;
