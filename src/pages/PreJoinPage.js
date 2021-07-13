import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles, Typography, Button} from '@material-ui/core';
import PreviewTrack from '../components/PreviewTrack';
import { useLocalMedia} from '../hooks';
import { MeetingContext } from '../context/MeetingContext';
import history from '../history';
import LogMessage from '../components/SnackBar';
import Loader from '../components/Loader';




const PreJoinPage = (props) => {
	const classes = useStyles();
	const { localTracks, isAcquiringLocalTrack, localTrackLog } = useLocalMedia(true);
	const { getAccessToken, isLoading, isValidRoom } = useContext(MeetingContext);
	const [mediaConfigurations, setMediaConfigurations] = useState({ isAudioMuted: false, isVideoMuted: false, audioDevice: '', videoDevice: '' });

	useEffect(() => {
		const check = async () => {
			const res = await isValidRoom(props.match.params.id);
			if (!res?.exists) {
				history.push('/');
			}
		};

		check();
		
	}, []);

	useEffect(() => {
		return () => {
			window.mediaSettings = {
				isAudioMuted: mediaConfigurations.isAudioMuted,
				isVideoMuted:mediaConfigurations.isVideoMuted
			}
		}
	})
	

	
	const handleAudio = () => {
		if (mediaConfigurations.isAudioMuted) {
			localTracks[0]?.enable();
			setMediaConfigurations({ ...mediaConfigurations, isAudioMuted: false });
		} else {
			localTracks[0]?.disable();
			setMediaConfigurations({ ...mediaConfigurations, isAudioMuted: true });
		}
	};

	const handleVideo = () => {
		if (mediaConfigurations.isVideoMuted) {
			localTracks[1]?.enable();
			setMediaConfigurations({ ...mediaConfigurations, isVideoMuted: false });
		} else {
			localTracks[1]?.disable();
			setMediaConfigurations({ ...mediaConfigurations, isVideoMuted: true });
		}
	};

	const handleJoin = () => {
		getAccessToken(props.match.params.id).then((token) => {
			if (token) {
				history.push(`/inroomload/${props.match.params.id}`);
			}
		});
	};

	function renderLoader () {
		return (
			<Loader open />
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
						 <PreviewTrack track={localTracks} mediaConfig={mediaConfigurations} handleVideo={handleVideo} handleAudio={handleAudio} />
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
