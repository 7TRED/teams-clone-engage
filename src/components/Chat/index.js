import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInputBox from './ChatInputBox';
import ParticipantList from '../ParticipantList';

function Chat () {
	const classes = useStyles();
	return (
		<Grid container item className={classes.root}>
			<Grid container item xs={8} direction="column" className={classes.chatContainer}>
				<ChatHeader />
				<ChatMessages />
				<ChatInputBox />
			</Grid>
			<Grid container item xs={4} className={classes.particpantList} alignItems="center">
				<ParticipantList />
			</Grid>
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
