import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, makeStyles } from '@material-ui/core';

function InviteButton () {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (_, reason) => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" className={classes.btn} color="primary" onClick={handleClickOpen}>
				Invite
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Join New Meeting</DialogTitle>
				<DialogContent>
					<DialogContentText>Please enter the meeting ID</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

const useStyles = makeStyles({
	btn : {
		width  : '100%',
		margin : '1rem',
	},
});

export default InviteButton;
