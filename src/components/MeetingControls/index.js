import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Mic, MicOff, Videocam, VideocamOff, PresentToAll, StopScreenShareSharp, CallEnd, ChatBubble } from '@material-ui/icons';

function MeetingControls () {
	const [ isAudioMuted, setAudioMuted ] = useState(false);
	const [ isVideoMuted, setVideoMuted ] = useState(false);
	const [ isScreenSharing, setScreenSharing ] = useState(false);
	const [ isChatActive, setChatActive ] = useState(false);
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Button variant="outlined" className={isAudioMuted ? classes.inactive : classes.root}>
				{isAudioMuted ? <MicOff /> : <Mic />}
			</Button>
			<Button variant="outlined" className={isVideoMuted ? classes.inactive : classes.root}>
				{isVideoMuted ? <VideocamOff /> : <Videocam />}
			</Button>
			<Button variant="outlined" className={isScreenSharing ? classes.inactive : classes.root}>
				{isScreenSharing ? <StopScreenShareSharp /> : <PresentToAll />}
			</Button>
			<Button variant="outlined" className={isChatActive ? classes.inactive : classes.root}>
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
	},

	inactive  : {
		background   : 'transparent',
		borderWidth  : 1,
		borderStyle  : 'solid',
		borderRadius : 100,
		borderColor  : 'red',
		color        : 'red',
		height       : 60,
	},

	callEnd   : {
		height       : 60,
		borderRadius : 1000,
	},

	container : {
		width          : '18%',
		display        : 'flex',
		justifyContent : 'space-evenly',
		position       : 'absolute',
		top            : '90%',
		left           : '43%',
	},
});

export default MeetingControls;
