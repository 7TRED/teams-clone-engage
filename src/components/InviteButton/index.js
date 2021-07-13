import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle,DialogContentText, DialogActions, makeStyles, IconButton, Typography, Grid } from '@material-ui/core';
import { FileCopy, CheckCircle} from '@material-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';


function InviteButton ({ meeting }) {
	const classes = useStyles();
    const [open, setOpen] = React.useState(false);
	const [copied, setCopied] = React.useState(false);
	const linkToBeShared = `teams-clone-c6129.web.app//room/${meeting?.room.roomID}`

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setCopied(false);
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" className={classes.btn} color="primary" onClick={handleClickOpen}>
				Invite
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Meeting Invite</DialogTitle>
				<DialogContent>
					<DialogContentText>Share this link to invite people in your meeting</DialogContentText>
					<Grid container item xs={12} alignSelf="center" direction="row" justify="center" alignItems="center">
						<Typography variant="subtitle1" className={classes.link}>{ linkToBeShared}</Typography>
						<CopyToClipboard text={linkToBeShared} onCopy={() => setCopied(true)}>
							{copied ? <CheckCircle className={classes.checked} /> : <IconButton size={"medium"} color="default"><FileCopy /></IconButton>}
						</CopyToClipboard>
					</Grid>
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
		width     : '90%',
		margin    : '1rem',
		alignSelf : 'center',
	},
	link: {
		width: '80%',
		background: '#ddd',
		padding: '0.5rem',
		overflowX:'auto'
	},
	checked: {
		width: '2rem',
		height: '2rem',
		color:'green'
	}
});

export default InviteButton;
