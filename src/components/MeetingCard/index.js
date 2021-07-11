import React, { useEffect } from 'react';
import { Card, Typography, makeStyles, CardActionArea, Avatar, CardHeader, Menu, MenuItem , IconButton, Badge} from '@material-ui/core';
import { Group , MoreVert} from '@material-ui/icons';
import videoConferencingImage from '../../assets/video_conferencing.jpg';
import { MeetingContext } from '../../context/MeetingContext'
import { getAllMessages } from '../../services/Firebase/firebaseDB';

function MeetingCard ({ meeting, onSelect }) {
	const classes = useStyles();
	
	console.log("card",meeting);

	return (
		<Card className={classes.root} onClick={()=>onSelect(meeting)}>
			<CardActionArea>
			<CardHeader
					avatar={<Avatar src={videoConferencingImage}><Group /></Avatar>}
				title={
					<Typography variant="subtitle1" className={classes.title}>
						{meeting?.room.roomTitle}
					</Typography>
				}
				className={classes.header}
			/>
			</CardActionArea>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	root    : {
		display      : 'flex',
		width        : '100%',
		alignItems   : 'center',
		boxShadow: 'none',
		background:'#f9f9f9',
		borderBottom : '1px solid #ccc',
	},
	details : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center',
	},
	
	
}));

export default MeetingCard;
