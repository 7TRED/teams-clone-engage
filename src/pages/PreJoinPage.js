import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles, Typography, Button , Avatar} from '@material-ui/core';
import ReactLoading from 'react-loading';
import PreviewTrack from '../components/PreviewTrack';
import { useLocalMedia} from '../hooks';
import { MeetingContext } from '../context/MeetingContext';
import { RoomContext } from '../context/RoomContext';
import history from '../history';
import LogMessage from '../components/SnackBar';




const PreJoinPage = (props) => {
	const classes = useStyles();
	const { localTracks, isAcquiringLocalTrack, localTrackLog } = useLocalMedia(true);
	const { getAccessToken, isLoading, isValidRoom, setMediaSettings } = useContext(MeetingContext);
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
		return () => {
			setMediaSettings(prevState => ({...prevState, isAudioMuted:mediaConfigurations.isAudioMuted, isVideoMuted:mediaConfigurations.isVideoMuted}))
		}
	}, []);


	

	
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
						<Grid container item direction="column" xs={12} sm={4} lg={3} className={classes.container} justify="center" alignItems="center">
							<Typography variant="h4" color="white" className={classes.hint}>Are you ready to Join?</Typography>
							<Button variant="contained" color="primary" size={"large"} className={classes.join}onClick={handleJoin} disabled={localTrackLog?.severity === 'error'}>
								Join
							</Button>
					</Grid>
					<LogMessage open={Boolean(localTrackLog)} severity={localTrackLog?.severity} message={localTrackLog?.message}/>
				</Grid>
					
			)}
		</div>
	);
};


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
		height       : '50%',
	},

	video     : {
		backgroundColor : '#222',
	},
	hint: {
		color: 'white',
		margin: '7%'
	}
});

export default PreJoinPage;
