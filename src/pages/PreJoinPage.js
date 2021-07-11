import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles, Typography, Button , Avatar} from '@material-ui/core';
import ReactLoading from 'react-loading';
import PreviewTrack from '../components/PreviewTrack';
import { useLocalMedia} from '../hooks';
import { MeetingContext } from '../context/MeetingContext';

import history from '../history';
import LogMessage from '../components/SnackBar';


const useStyles = makeStyles({
	card      : {
		height   : '60%',
		width    : '60%',
		position : 'relative',
	},

	mainContainer: {
		display         : 'flex',
		flex            : 1,
		backgroundColor : '#222',
		height          : '100vh',
		width           : '100vw',
		justifyContent  : 'center',
		alignItems      : 'center',
		position        : 'absolute',
		top             : 0,
		left            : 0,
	},

	container : {
		borderWidth  : '1px',
		borderColor  : 'rgba(2,2,180,0.2)',
		borderStyle  : 'solid',
		borderRadius : '0.4em',
		margin       : '2em',
		height       : '75%',
	},

	video     : {
		backgroundColor : '#222',
	},
	avatar: {
		heigth: '30%',
		width:'14%'
	}
});

const PreJoinPage = (props) => {
	const classes = useStyles();
	
	const { localTracks, isAcquiringLocalTrack, localTrackLog } = useLocalMedia(true);
	const { getAccessToken, isLoading, roomState, isValidRoom } = useContext(MeetingContext);
	const [isLogOpen, setIsLogOpen] = React.useState(false);
	const [mediaConfigurations, setMediaConfigurations] = useState({ isAudioMuted: false, isVideoMuted: false, audioDevice: '', videoDevice: '' });

	useEffect(() => {
		const check = async () => {
			const res = await isValidRoom(props.match.params.id);
			console.log(res);
			if (!res.exists) {
				history.push('/');
			}
		};

		check();
	}, []);

	const onLogClose = () => {
		setIsLogOpen(false);
	}
	
	
	const handleAudio = () => {
		if (mediaConfigurations.isAudioMuted) {
			localTracks[0].enable();
			setMediaConfigurations({ ...mediaConfigurations, isAudioMuted: false });
		} else {
			localTracks[0].disable();
			setMediaConfigurations({ ...mediaConfigurations, isAudioMuted: true });
		}
	};

	const handleVideo = () => {
		if (mediaConfigurations.isVideoMuted) {
			localTracks[1].enable();
			setMediaConfigurations({ ...mediaConfigurations, isVideoMuted: false });
		} else {
			localTracks[1].disable();
			setMediaConfigurations({ ...mediaConfigurations, isVideoMuted: true });
		}
	};

	const handleJoin = () => {
		getAccessToken(props.match.params.id).then((token) => {
			if (token) {
				history.push(`/inroom/${props.match.params.id}`);
			}
		});
	};

	function renderLoader () {
		return (
			<div>
				<ReactLoading type={'spinningBubbles'} color="#f7f7f7" />
				<h3 style={{ color: '#f7f7f7' }}>Loading</h3>
			</div>
		);
	}

	return (
		<div
			className={classes.mainContainer}
		>
			{isLoading || isAcquiringLocalTrack ? (
				renderLoader()
			) : (
				<Grid container item direction="row" xs={12} className={classes.card} justify="center" alignItems="center">
						 <PreviewTrack track={localTracks[1]} mediaConfig={mediaConfigurations} handleVideo={handleVideo} handleAudio={handleAudio} />


					<Grid container item direction="row" xs={12} sm={4} lg={3} className={classes.container} justify="space-evenly" alignItems="center">
						<Button variant="contained" color="primary" onClick={handleJoin} disabled={localTrackLog?.severity === 'error'}>
							Join
						</Button>
					</Grid>
					<LogMessage open={Boolean(localTrackLog)} severity={localTrackLog?.severity} message={localTrackLog?.message}/>
				</Grid>
					
			)}
		</div>
	);
};

export default PreJoinPage;
