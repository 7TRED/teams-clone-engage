import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, CircularProgress } from '@material-ui/core';
import { MeetingContext } from '../../context/MeetingContext';
import LogMessage from '../SnackBar';

function JoinMeetingButton () {
	const [ roomID, setRoomID ] = React.useState('');
	const { joinRoom, isLoading, roomState } = React.useContext(MeetingContext);
	const [open, setOpen] = React.useState(false);
	const [isLogOpen, setLogOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const onLogClose = () => {
		setLogOpen(false);
	}

	const handleClose = (_, reason) => {
		if (reason === 'backdropClick') {
			return;
		}
		setOpen(false);
	};

	const handleOnClick = async () => {
		await joinRoom(roomID);
		setOpen(false);
		setLogOpen(true);
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
			<LogMessage open={isLogOpen} severity={roomState.log?.severity} message={roomState.log?.message} onClose={onLogClose}/>
		</div>
	);
}

export default JoinMeetingButton;
