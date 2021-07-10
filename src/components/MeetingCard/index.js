import React, { useEffect } from 'react';
import { Card, Typography, makeStyles, CardActionArea, Avatar, CardHeader, Menu, MenuItem , IconButton} from '@material-ui/core';
import { Group , MoreVert} from '@material-ui/icons';
import videoConferencingImage from '../../assets/video_conferencing.jpg';
import {MeetingContext} from '../../context/MeetingContext'

function MeetingCard ({ meeting, onSelect }) {
	const classes = useStyles();
	const { selectMeeting } = React.useContext(MeetingContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOnClick = (e) => {
		setAnchorEl(e.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null);
	}
	
	
	console.log("card",meeting);

	return (
		<Card className={classes.root} onClick={() => onSelect(meeting)}>
			<CardActionArea>
			<CardHeader
					avatar={<Avatar src={videoConferencingImage}><Group /></Avatar>}
				title={
					<Typography variant="subtitle1" className={classes.title}>
						{meeting?.room.roomTitle}
					</Typography>
				}
				// action={
				// 	<React.Fragment>
				// 		<IconButton aria-label="settings" onClick={handleOnClick}>
				// 			<MoreVert />
				// 		</IconButton>
				// 		<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				// 			<MenuItem onClick={handleClose}>Logout</MenuItem>
				// 		</Menu>
				// 	</React.Fragment>
				// }
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
		boxShadow    : 'none',
		background   : 'transparent',
		borderBottom : '1px solid #ccc',
	},
	details : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center',
	},
	
	
}));

export default MeetingCard;
