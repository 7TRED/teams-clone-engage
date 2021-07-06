import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

function Chat () {
	const classes = useStyles();
	return (
		<Grid container item xs={12} className={classes.root}>
			<Grid container item xs={8} className={classes.chatContainer}>
				Chat Messages
			</Grid>
			<Grid container item xs={4} className={classes.particpantList}>
				Participant List
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root          : {
		flex   : 1,
		height : '100%',
	},
	chatContainer : {
		border : '1px solid #ccc',
	},
});

export default Chat;
