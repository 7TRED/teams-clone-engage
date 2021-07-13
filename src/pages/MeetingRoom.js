import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingControls from '../components/MeetingControls';
import Loader from '../components/Loader';
import { MeetingContext } from '../context/MeetingContext';
import Chat from '../components/Chat';
import ParticipantList from '../components/ParticipantList';
import history from '../history';
import VideoContainer from '../components/VideoContainer';

function MeetingRoom (props) {
	const classes = useStyles();
	const { roomState, isValidRoom } = useContext(MeetingContext);
	const [ room, setRoom ] = useState(undefined);
	const [ isChatActive, setIsChatActive ] = useState(false);
	const [ isParticipantListActive, setParticipantListActive ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		const ConnectToRoom = async () => {
			const res = await isValidRoom(props.match.params.id);
			if (res.exists && roomState.accessToken) {
				setRoom(res.data());
			} else {
				history.replace(`/inroomload/${props.match.params.id}`);
			}
			setIsLoading(false);
		};
		setIsLoading(true);
		ConnectToRoom();
	}, []);

	function renderLoader () {
		return <Loader open />;
	}

	const ListOfParticipants = React.useMemo(() => <ParticipantList meeting={{ room: room }} />, [ room ]);
	const ChatRoom = React.useMemo(() => <Chat meeting={{ room: room }} inMeeting />, [ room ]);

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
			{isLoading ? renderLoader() : renderMeeting()}
		</Grid>
	);
}

const useStyles = makeStyles({
	mainContainer  : {
		flex            : 1,
		height          : '95vh',
		backgroundColor : '#272727',
	},
	videoContainer : {
		position : 'relative',
		height   : '100%',
	},
	controlBar     : {
		height : '10%',
	},
	chatContainer  : {
		backgroundColor : '#f7f7f7',
		transition      : 'all  0.2s',
		height          : '97%',
	},
});

export default MeetingRoom;
