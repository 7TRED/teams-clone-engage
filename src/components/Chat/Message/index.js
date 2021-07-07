import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

function Message () {
	const classes = useStyles();
	return (
		<Grid container item direction="column" className={classes.root} justify="space-evenly">
			<Grid container item className={classes.messageHeader}>
				<Typography className={classes.username}>UserName</Typography>
				<Typography className={classes.timestamp} color={'textSecondary'}>
					12:09
				</Typography>
			</Grid>
			<Grid container item className={classes.message} direction="column">
				<Grid container item className={classes.messageContent}>
					<Typography>I am the one</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root           : {
		background   : '#f4f4f4',
		padding      : '0.7em',
		borderRadius : 5,
		margin       : '0.2em',
	},
	message        : {
		width     : '100%',
		marginTop : '0.6em',
	},
	messageHeader  : {
		padding        : '0.1em',
		flex           : 0.4,
		justifyContent : 'space-between',
		borderBottom   : '1px solid #ccc',
	},
	username       : {
		color    : '#4d4dff',
		fontSize : '0.9rem',
	},
	timestamp      : {
		fontSize : '0.8rem',
	},
	messageContent : {},
});

export default Message;
