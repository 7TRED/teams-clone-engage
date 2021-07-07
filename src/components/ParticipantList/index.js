import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Participant from './Participant';

function ParticpantList () {
	const classes = useStyles();
	return (
		<Grid container item xs={12} direction="column" className={classes.root}>
			<Grid container item direction="row" className={classes.header} alignItems="flex-end" justify="center">
				<Typography variant="h5" color="textPrimary">
					Participants
				</Typography>
			</Grid>
			<Grid container item direction="column" className={classes.organizer}>
				<Typography variant="h6" color="textPrimary">
					Organizer
				</Typography>
				<Participant />
			</Grid>
			<Grid container item direction="column" className={classes.attendees}>
				<Typography variant="h6" color="textPrimary">
					Attendees
				</Typography>
				<Participant />
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root      : {
		height      : '98%',
		paddingLeft : '1em',
	},
	header    : {
		flex          : 0.1,
		borderBottom  : '2px solid #eee',
		paddingBottom : '1em',
	},
	organizer : {
		flex : 0.1,
	},
	attendees : {
		flex : 1,
	},
});

export default ParticpantList;
