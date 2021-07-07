import React, {useState} from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, TextField, TextareaAutosize, makeStyles } from '@material-ui/core';
import ReactLoading from 'react-loading';
import history from '../../history';
import { MeetingContext, Errors } from '../../context/MeetingContext';

function CreateMeetingButton (props) {
	const { isLoading, createRoom } = React.useContext(MeetingContext);
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	
	const [open, setOpen] = React.useState(false);

  	const handleClickOpen = () => {
    	setOpen(true);
  	};

	const handleClose = (_,reason) => {
		if (reason === 'backdropClick') {
			return;
		}
   		setOpen(false);
  	};
	
  	const handleOnClick = () => {
		createRoom().then((roomDetails) => {
			if (roomDetails) {
				console.log(roomDetails)
				history.push(`/room/${roomDetails?.uniqueName}`);
			}
		});	
	}	

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Create Meeting
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Create Meeting</DialogTitle>
				<DialogContent>
				<DialogContentText>
					Please provide Meeting title and description (optional) for the new meeting.
				</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Title"
						fullWidth
						value={title}
						onChange={(e)=>setTitle(e.target.value)}
					/>
					<TextField margin="dense" label="Description" fullWidth variant="outlined" multiline rows={6} rowsMax={'infinite'} value={description} onChange={(e)=>setDescription(e.target.value) }/>
					
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose}  color="primary">
					Cancel
				</Button>
				<Button onClick={handleOnClick} disabled={!(title && description)} color="primary">
					Create
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);

}


const useStyles = makeStyles({
	description: {
		width: '100%',
		height: '5em'
	}
})

export default CreateMeetingButton;
