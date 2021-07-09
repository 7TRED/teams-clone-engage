import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, CircularProgress } from '@material-ui/core';

import history from '../../history';
import { MeetingContext } from '../../context/MeetingContext';

function JoinMeetingButton () {
	const [ roomID, setRoomID ] = React.useState('');
	const { joinRoom, isLoading } = React.useContext(MeetingContext);
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
		await joinRoom(roomID);
		setOpen(false);
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
					<TextField
						margin="dense"
						id="name"
						label="Meeting ID"
						placeholder="Enter meeting ID"
						fullWidth
						value={roomID}
						onChange={(e) => setRoomID(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleOnClick} color="primary" disabled={!roomID}>
						Join {isLoading && <CircularProgress />}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default JoinMeetingButton;
