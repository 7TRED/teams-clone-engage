import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import JoinMeetingButton from '../../JoinMeetingButton';

function ChatHeader () {
	const classes = useStyles();
	return (
		<Grid container item direction="row" className={classes.root} justify="space-between" alignItems="center">
			<Typography className={classes.title} variant="h5">
				MeetingName
			</Typography>
			<JoinMeetingButton />
		</Grid>
	);
}

const useStyles = makeStyles({
	root : {
		width        : '100%',
		height       : '10%',
		borderBottom : '1px solid #ddd',
		paddingLeft  : '2em',
		paddingRight : '2em',
	},
});

export default ChatHeader;
