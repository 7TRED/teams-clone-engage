import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingControls from '../components/MeetingControls';
import ReactLoading from 'react-loading';
import { MeetingContext } from '../context/MeetingContext';
import Chat from '../components/Chat';
import ParticipantList from '../components/ParticipantList';

import { RoomContext } from '../context/RoomContext';
import VideoContainer from '../components/VideoContainer';

function MeetingRoom (props) {
	const classes = useStyles();
	const { roomState, isValidRoom } = useContext(MeetingContext);
	const [ room, setRoom ] = useState(undefined);
	const { connect, isConnecting } = useContext(RoomContext);
	const [ isChatActive, setIsChatActive ] = useState(false);
	const [ isParticipantListActive, setParticipantListActive ] = useState(false);

	useEffect(() => {
		const ConnectToRoom = async () => {
			const res = await isValidRoom(props.match.params.id);
			if (res.exists) {
				connect(roomState.accessToken, { name: props.match.params.id });
				setRoom(res.data());
			}
		};
		ConnectToRoom();
	}, []);

	console.log(room);

	function renderLoader () {
		return (
			<div>
				<ReactLoading type={'spinningBubbles'} color="#fff" />
				<div>Loading</div>
			</div>
		);
	}

	const ListOfParticipants = React.useMemo(() => <ParticipantList meeting={{ room: room }} />, [ room ]);
	const ChatRoom = React.useMemo(() => <Chat meeting={{ room: room }} />, [ room ]);

	function renderMeeting () {
		return (
			<React.Fragment>
				<Grid container item xs={isChatActive || isParticipantListActive ? 9 : 12} direction="row" justify="center " className={classes.videoContainer}>
					<VideoContainer widthChanged={isChatActive || isParticipantListActive} />
					<Grid container item xs={12} direction="row" justify="center" alignItems="center">
						<MeetingControls
							isChatActive={isChatActive}
							isParticipantListActive={isParticipantListActive}
							handleParticipantListActive={setParticipantListActive}
							handleChatActive={setIsChatActive}
						/>
					</Grid>
				</Grid>

				{isChatActive && (
					<Grid container item xs={3} direction="column" justify="space-evenly" className={classes.chatContainer} alignItems="center">
						{ChatRoom}
					</Grid>
				)}
				{isParticipantListActive && (
					<Grid container item xs={3} direction="column" justify="space-evenly" className={classes.chatContainer} alignItems="center">
						{ListOfParticipants}
					</Grid>
				)}
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
		paddingTop      : '3%',
		margin          : 0,
	},
	videoContainer : {
		position : 'relative',
		height   : '90%',
	},
	controlBar     : {
		height : '10%',
	},
	chatContainer  : {
		backgroundColor : '#f7f7f7',
		transition      : 'all 0.7s 0.2s',
		height          : '100%',
	},
});

export default MeetingRoom;
