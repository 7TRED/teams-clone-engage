import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingControls from '../components/MeetingControls';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import { RoomContext } from '../context/RoomContext';

function MeetingRoom (props) {
	const classes = useStyles();
	const { connect, isConnecting } = useContext(RoomContext);
	const [ meetingState, setMeetingState ] = useState({ isAudioMuted: false, isVideoMuted: false, isChatActive: false, isScreenSharing: false, showParticipants: false });

	useEffect(() => {
		console.log(props.token);
		connect(props.token);
	}, []);

	const handleChatToggle = () => {
		if (meetingState.isChatActive) {
			setMeetingState({ ...meetingState, isChatActive: false });
		} else {
			setMeetingState({ ...meetingState, isChatActive: true });
		}
	};

	const handleAudioToggle = () => {
		if (meetingState.isAudioMuted) {
			setMeetingState({ ...meetingState, isAudioMuted: false });
		} else {
			setMeetingState({ ...meetingState, isAudioMuted: true });
		}
	};

	const handleVideoToggle = () => {
		if (meetingState.isVideoMuted) {
			setMeetingState({ ...meetingState, isVideoMuted: false });
		} else {
			setMeetingState({ ...meetingState, isVideoMuted: true });
		}
	};

	const handleScreenSharing = () => {
		if (meetingState.isScreenSharing) {
			setMeetingState({ ...meetingState, isScreenSharing: false });
		} else {
			setMeetingState({ ...meetingState, isScreenSharing: true });
		}
	};

	function renderLoader () {
		return (
			<div>
				<ReactLoading type={'spinningBubbles'} color="#fff" />
				<div>Loading</div>
			</div>
		);
	}

	function renderMeeting () {
		return (
			<React.Fragment>
				<Grid container item xs={meetingState.isChatActive ? 9 : 12} direction="row" className={classes.videoContainer}>
					<MeetingControls
						meetingState={meetingState}
						handleChatToggle={handleChatToggle}
						handleAudioToggle={handleAudioToggle}
						handleVideoToggle={handleVideoToggle}
						handleScreenSharing={handleScreenSharing}
					/>
				</Grid>

				{meetingState.isChatActive ? (
					<Grid container item direction="row" xs={3} className={classes.chatContainer}>
						chat
					</Grid>
				) : null}
			</React.Fragment>
		);
	}

	return (
		<Grid container item direction="row" className={classes.mainContainer} justify="center" alignItems="center">
			{isConnecting ? renderLoader() : renderMeeting()}
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
		height     : '100%',
	},
	chatContainer  : {
		backgroundColor : '#f7f7f7',
		transition      : 'all 0.7s 0.2s',
		height          : '100%',
	},
});

const mapStateToProps = (state) => {
	return { roomDetails: state.meeting.room, localmediaConfig: state.meeting.localMediaConfig, identity: state.meeting.identity, token: state.meeting.token };
};

const MeetingRoomWithState = connect(mapStateToProps)(MeetingRoom);

export default MeetingRoomWithState;
