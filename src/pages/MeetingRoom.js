import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingControls from '../components/MeetingControls';

function MeetingRoom (props) {
	const classes = useStyles();
	const [ isChatActive, setChatActive ] = useState(false);
	const [ isAudioMuted, setAudioMuted ] = useState(false);
	const [ isVideoMuted, setVideoMuted ] = useState(false);
	const [ isScreenSharing, setScreenSharing ] = useState(false);

	const handleChatToggle = () => {
		if (isChatActive) {
			setChatActive(false);
		} else {
			setChatActive(true);
		}
	};

	const handleAudioToggle = () => {
		if (isAudioMuted) {
			setAudioMuted(false);
		} else {
			setAudioMuted(true);
		}
	};

	const handleVideoToggle = () => {
		if (isVideoMuted) {
			setVideoMuted(false);
		} else {
			setVideoMuted(true);
		}
	};

	const handleScreenSharing = () => {
		if (isScreenSharing) {
			setScreenSharing(false);
		} else {
			setScreenSharing(true);
		}
	};

	return (
		<Grid container item direction="row" className={classes.mainContainer}>
			<Grid container item xs={isChatActive ? 8 : 12} direction="row" className={classes.videoContainer}>
				<MeetingControls />
			</Grid>
			{isChatActive ? (
				<Grid container item direction="row" xs={4}>
					chat
				</Grid>
			) : null}
		</Grid>
	);
}

const useStyles = makeStyles({
	mainContainer  : {
		flex            : 1,
		height          : '100vh',
		backgroundColor : '#272727',
		width           : '100vw',
		position        : 'absolute',
		top             : 0,
		left            : 0,
	},
	videoContainer : {
		paddingTop : '3%',
		position   : 'relative',
	},
	chatContainer  : {},
});

export default MeetingRoom;
