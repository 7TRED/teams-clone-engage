import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingControls from '../components/MeetingControls';
import ReactLoading from 'react-loading';
import { useLocalMedia } from '../hooks';
import { MeetingContext } from '../context/MeetingContext';

import { RoomContext } from '../context/RoomContext';
import VideoContainer from '../components/VideoContainer';

function MeetingRoom (props) {
	const classes = useStyles();
	const { roomState } = useContext(MeetingContext);
	const { connect, isConnecting } = useContext(RoomContext);
	const [ isChatActive, setIsChatActive ] = useState(false);

	useEffect(() => {
		connect(roomState.accessToken, { name: props.match.params.id });
	}, []);

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
				<Grid container item xs={isChatActive ? 9 : 12} direction="row" className={classes.videoContainer}>
					<VideoContainer />
					<MeetingControls isChatActive={isChatActive} handleChatActive={setIsChatActive} />
				</Grid>

				{isChatActive ? (
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

export default MeetingRoom;
