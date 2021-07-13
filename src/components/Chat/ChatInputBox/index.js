import React from 'react';
import { Grid, makeStyles, TextField, Button } from '@material-ui/core';
import { SendSharp } from '@material-ui/icons';
import { addMessage } from '../../../services/Firebase/firebaseDB';
import { AuthContext } from '../../../context/AuthContext';

function ChatInputBox ({ meeting }) {
	const classes = useStyles();
	const { authState } = React.useContext(AuthContext);
	const [ message, setMessage ] = React.useState('');

	const handleSend = () => {
		addMessage(meeting.room.roomID, { sentAt: new Date().toISOString(), content: message, sentBy: { ...authState.user } });
		setMessage('');
	};

	return (
		<Grid container item direction="row" className={classes.root} justify="center" alignItems="center">
			<TextField placeholder="Type a Message" className={classes.input} value={message} onChange={(e) => setMessage(e.target.value)} />
			<Button variant="contained" className={classes.btn} size="small" color="primary" disabled={!message} onClick={handleSend}>
				<SendSharp />
			</Button>
		</Grid>
	);
}

const useStyles = makeStyles({
	root     : {
		alignSelf    : 'center',
		border       : '1px solid #ccc',
		borderRadius : 8,
	},
	inputBox : {
		margin : '1rem',
	},
	input    : {
		width  : '78%',
		margin : '0.5rem',
	},
	btn      : {
		maxWidth : '15%',
	},
});

export default ChatInputBox;
