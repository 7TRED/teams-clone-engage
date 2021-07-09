import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInputBox from './ChatInputBox';
import ParticipantList from '../ParticipantList';

function Chat ({ meeting }) {
	const classes = useStyles();
	return (
		<Grid container item xs={12} direction="column" justify="space-evenly" className={classes.chatContainer} alignItems="center">
			<ChatHeader meeting={meeting} />
			<ChatMessages meeting={meeting} />
			<ChatInputBox meeting={meeting} />
		</Grid>
	);
}

const useStyles = makeStyles({
	root           : {
		flex   : 1,
		height : '100%',
	},
	chatContainer  : {
		height      : '100%',
		borderRight : '1px solid #ccc',
	},
	particpantList : {
		height : '100%',
	},
});

export default Chat;
