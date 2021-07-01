import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Mic, MicOff, Videocam, VideocamOff, PresentToAll, StopScreenShareSharp, CallEnd, ChatBubble } from '@material-ui/icons';

function MeetingControls (props) {
	const { meetingState } = props;
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Button variant="outlined" className={meetingState.isAudioMuted ? classes.inactive : classes.root} onClick={props.handleAudioToggle}>
				{meetingState.isAudioMuted ? <MicOff /> : <Mic />}
			</Button>
			<Button variant="outlined" className={meetingState.isVideoMuted ? classes.inactive : classes.root} onClick={props.handleVideoToggle}>
				{meetingState.isVideoMuted ? <VideocamOff /> : <Videocam />}
			</Button>
			<Button variant="outlined" className={meetingState.isScreenSharing ? classes.inactive : classes.root} onClick={props.handleScreenSharing}>
				{meetingState.displayisScreenSharing ? <StopScreenShareSharp /> : <PresentToAll />}
			</Button>
			<Button variant="outlined" className={meetingState.isChatActive ? classes.inactive : classes.root} onClick={props.handleChatToggle}>
				<ChatBubble />
			</Button>
			<Button variant="contained" className={classes.callEnd} color="secondary">
				<CallEnd />
			</Button>
		</div>
	);
}

const useStyles = makeStyles({
	root      : {
		background   : 'transparent',
		borderWidth  : 1,
		borderStyle  : 'solid',
		borderRadius : 1000,
		borderColor  : 'white',
		color        : 'white',
		height       : 60,
		margin       : '0.4em',
	},

	inactive  : {
		background   : 'transparent',
		borderWidth  : 1,
		borderStyle  : 'solid',
		borderRadius : 100,
		borderColor  : 'red',
		color        : 'red',
		height       : 60,
		margin       : '0.4em',
	},

	callEnd   : {
		height       : 60,
		borderRadius : 1000,
		margin       : '0.4em',
	},

	container : {
		display        : 'flex',
		justifyContent : 'space-evenly',
		position       : 'absolute',
		top            : '90%',
		left           : '40%',
	},
});

export default MeetingControls;
