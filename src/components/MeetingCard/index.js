import React  from 'react';
import { Card, Typography, makeStyles, CardActionArea, Avatar, CardHeader} from '@material-ui/core';
import { Group} from '@material-ui/icons';
import videoConferencingImage from '../../assets/video_conferencing.jpg';

/** 
 * Card shown in the meeting list component on the homepage
 */

function MeetingCard ({ meeting, onSelect }) {
	const classes = useStyles();
	
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

const useStyles = makeStyles({
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
	
	
});

export default MeetingCard;
