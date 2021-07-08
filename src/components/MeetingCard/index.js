import React, { useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import videoConferencingImage from '../../assets/video_conferencing.jpg';

function MeetingCard ({ meeting, onSelect }) {
	const classes = useStyles();
	const [meet, setMeet] = React.useState();

	useEffect(() => {
		const getRoom = async () => {
			const room = await meeting.room.get();
			setMeet(room.data());
		}
		getRoom();
	}, [meeting])
	
	console.log(meet);

	return (
		<Card className={classes.root} onClick={()=>onSelect(meet)}>
			<CardMedia className={classes.cover} component="img" src={videoConferencingImage} title="Profile Picture" />
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography className={classes.title} color="primary" variant="subtitle1">
						{meet?.room.roomTitle}
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
