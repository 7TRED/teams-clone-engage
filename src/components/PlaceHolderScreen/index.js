import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import CreateMeetingButton from '../CreateMeetingButton';
import JoinMeetingButtonForm from '../JoinMeetingButtonForm';

function PlaceHolderScreen () {
	const classes = useStyles();
	return (
		<Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
			<Typography variant="h4" color="primary" className={classes.text}>
				Welcome to Teamspace.<br /> <br />Here you can create teams, collab, chat and organize meets with your team members.
			</Typography>
			<Grid container xs={4} item direction="row" justify="space-evenly" alignItems="center" className={classes.btnContainer}>
				<CreateMeetingButton variant="outlined" />
				<JoinMeetingButtonForm variant="outlined" />
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root         : {
		flex   : 1,
		height : '100%',
	},

	text         : {
		width     : '60%',
		textAlign : 'center',
	},
	btnContainer : {
		width : '40%',
		flex  : '0.2',
	},
});

export default PlaceHolderScreen;
