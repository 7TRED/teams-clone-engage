import React, { useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import videoConferencingImage from '../../assets/video_conferencing.jpg';
import {MeetingContext} from '../../context/MeetingContext'

function MeetingCard ({ meeting, onSelect }) {
	const classes = useStyles();
	const { selectMeeting } = React.useContext(MeetingContext);

	
	
	console.log("card",meeting);

	return (
		<Card className={classes.root} onClick={()=>onSelect(meeting)}>
			<CardMedia className={classes.cover} component="img" src={videoConferencingImage} title="Profile Picture" />
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography className={classes.title} color="primary" variant="subtitle1">
						{meeting?.room.roomTitle}
					</Typography>
					<Typography className={classes.subtitle} color="textSecondary" variant="subtitle2">
						{}
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	root    : {
		display      : 'flex',
		width        : '100%',
		alignItems   : 'center',
		height       : '5em',
		paddingLeft  : '0.2em',
		margin       : '0.2em',
		boxShadow    : 'none',
		background   : 'transparent',
		borderBottom : '1px solid #ccc',
	},
	details : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center',
	},
	content : {
		display       : 'flex',
		flexDirection : 'column',
	},
	cover   : {
		width        : 60,
		height       : 60,
		borderRadius : 50,
	},
}));

export default MeetingCard;
