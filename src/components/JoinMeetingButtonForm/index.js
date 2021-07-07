import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';

import history from '../../history';
import { MeetingContext } from '../../context/MeetingContext';

function JoinMeetingButton () {
	const [ roomID, setRoomID ] = React.useState('');
	const { isValidRoom } = React.useContext(MeetingContext);
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (_, reason) => {
		if (reason === 'backdropClick') {
			return;
		}
		setOpen(false);
	};

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
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Join New Meeting
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Join New Meeting</DialogTitle>
				<DialogContent>
					<DialogContentText>Please enter the meeting ID</DialogContentText>
					<TextField margin="dense" id="name" label="Meeting ID" placeholder="Enter meeting ID" fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Join
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default JoinMeetingButton;
