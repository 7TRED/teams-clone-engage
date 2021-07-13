import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Chat from '../Chat';
import ParticipantList from '../ParticipantList';
import PlaceHolderScreen from '../PlaceHolderScreen';

/** 
 * This component contains the chats and participant list of a meeting
 */

function MeetingSection ({ meeting }) {
	const classes = useStyles();
	return (
		<Grid container item direction="row" className={classes.root}>
			{meeting ? (
				<React.Fragment>
					<Grid container xs={8} item className={classes.chatContainer}>
						<Chat meeting={meeting} />
					</Grid>
					<Grid container xs={4} item direction="row" className={classes.participantsList}>
						<ParticipantList meeting={meeting} />
					</Grid>
				</React.Fragment>
			) : (
				<PlaceHolderScreen />
			)}
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

export default React.memo(MeetingSection);
