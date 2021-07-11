import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function LogMessage ({ open, severity, message, duration, onClose }) {
	const handleClose = (_, reason) => {
		onClose();
	};
	return (
		<Snackbar open={open} autoHideDuration={duration ? duration : 5000} onClose={handleClose}>
			<MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
				{message}
			</MuiAlert>
		</Snackbar>
	);
}

export default LogMessage;
