import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Mic, MicOff, Videocam, VideocamOff, PresentToAll, StopScreenShareSharp, CallEnd, ChatBubble } from '@material-ui/icons';
import { useRoomContext } from '../../hooks';

function MeetingControls (props) {
	const classes = useStyles();
	const { room } = useRoomContext();
	const [ meetingState, setMeetingState ] = useState({ isAudioMuted: false, isVideoMuted: false, isScreenSharing: false, showParticipants: false });

	function onAudioButtonClick () {
		if (meetingState.isAudioMuted) {
			room.localParticipant.audioTracks.forEach((trackPublication) => trackPublication.track.enable());
			setMeetingState({ ...meetingState, isAudioMuted: false });
		} else {
			room.localParticipant.audioTracks.forEach((trackPublication) => trackPublication.track.disable());
			setMeetingState({ ...meetingState, isAudioMuted: true });
		}
	}

	function onVideoButtonClick () {
		if (meetingState.isVideoMuted) {
			room.localParticipant.videoTracks.forEach((trackPublication) => trackPublication.track.enable());
			setMeetingState({ ...meetingState, isVideoMuted: false });
		} else {
			room.localParticipant.videoTracks.forEach((trackPublication) => trackPublication.track.disable());
			setMeetingState({ ...meetingState, isVideoMuted: true });
		}
	}

	function onCallEnd () {
		room.localParticipant.tracks.forEach((trackPublication) => {
			trackPublication.track.stop();
		});

		room.disconnect();
	}

	function onChatButtonClick () {
		if (props.isChatActive) {
			props.handleChatActive(false);
		} else {
			props.handleChatActive(true);
		}
	}

	function onScreenButtonClick () {}

	return (
		<div className={classes.container}>
			<Button variant="outlined" className={meetingState.isAudioMuted ? classes.inactive : classes.root} onClick={onAudioButtonClick}>
				{meetingState.isAudioMuted ? <MicOff /> : <Mic />}
			</Button>
			<Button variant="outlined" className={meetingState.isVideoMuted ? classes.inactive : classes.root} onClick={onVideoButtonClick}>
				{meetingState.isVideoMuted ? <VideocamOff /> : <Videocam />}
			</Button>
			<Button variant="outlined" className={meetingState.isScreenSharing ? classes.inactive : classes.root} onClick={onScreenButtonClick}>
				{meetingState.displayisScreenSharing ? <StopScreenShareSharp /> : <PresentToAll />}
			</Button>
			<Button variant="outlined" className={meetingState.isChatActive ? classes.inactive : classes.root} onClick={onChatButtonClick}>
				<ChatBubble />
			</Button>
			<Button variant="contained" className={classes.callEnd} color="secondary" onClick={onCallEnd}>
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
