import React from 'react';
import { Grid, makeStyles, TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { addMessage } from '../../../services/Firebase/firebaseDB';
import { AuthContext } from '../../../context/AuthContext';

function ChatInputBox ({ meeting }) {
	const classes = useStyles();
	const { authState } = React.useContext(AuthContext);
	const [ message, setMessage ] = React.useState('');

	const handleSend = () => {
		addMessage(meeting.room.roomID, { content: message, sentBy: authState.user.uid });
		setMessage('');
	};

	return (
		<Grid container item direction="row" className={classes.root} justify="center" alignItems="center">
			<Grid container item xs={11} className={classes.inputBox}>
				<TextField multiline fullWidth placeholder="Type a Message" value={message} onChange={(e) => setMessage(e.target.value)} />
			</Grid>
			<Grid container item xs={1}>
				<Button variant="contained" color="primary" disabled={!message} onClick={handleSend}>
					<Send />
				</Button>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root     : {
		width        : '88%',
		alignSelf    : 'center',
		border       : '1px solid #ccc',
		borderRadius : 8,
		height       : '8%',
		padding      : '0.5em',
	},
	inputBox : {
		padding : '0.3em',
	},
	input    : {
		flex : 1,
	},
});

export default ChatInputBox;
