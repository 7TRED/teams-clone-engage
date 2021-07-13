import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Participant from './Participant';
import { db } from '../../services/Firebase';
import { getAllRoomParticipants } from '../../services/Firebase/firebaseDB';

function ParticpantList ({ meeting }) {
	const classes = useStyles();
	const [ participants, setParticipants ] = React.useState([]);

	React.useEffect(() => {
		const callback = (snapshot) => {
			let allParticipants = [];
			snapshot.forEach(res => {
				allParticipants.push(res.data());
			})
			setParticipants(allParticipants);
		}
		getAllRoomParticipants(meeting?.room?.roomID, callback);
	}, [meeting]);

	console.log(participants)
	console.log("participant" ,meeting)
	
	return (
		<Grid container item xs={12} direction="column" className={classes.root}>
			<Grid container item direction="row" className={classes.header} alignItems="flex-end" justify="center">
				<Typography variant="h5" color="textPrimary">
					Participants
				</Typography>
			</Grid>
			<Grid container item direction="column" className={classes.attendees}>
				{participants.map((participant,idx) =>participant.user !== meeting.owner && <Participant participant={participant} key={idx}/>)}
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root      : {
		height      : '98%',
	},
	header    : {
		flex          : 0.1,
		borderBottom  : '2px solid #eee',
		paddingBottom: '1rem',
		borderBottom:'1px solid #ccc'
	},
	
	attendees : {
		height:'70%',
		overflowX : 'hidden',
		overflowY: 'auto',
		margin:'1rem'
	},
});

export default React.memo(ParticpantList);
