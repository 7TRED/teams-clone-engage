import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import ReactLoading from 'react-loading';
import PreJoinForm from '../components/PreJoinForm';
import PreviewTrack from '../components/PreviewTrack';
import { useLocalMedia, useAudioDevices, useVideoDevices } from '../hooks';
import { MeetingContext } from '../context/MeetingContext';
import history from '../history';

const useStyles = makeStyles({
	card      : {
		height   : '60%',
		width    : '60%',
		position : 'relative',
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
});

const PreJoinPage = (props) => {
	const classes = useStyles();
	const { localTracks } = useLocalMedia(true);
	const { getAccessToken, isLoading, roomState, isValidRoom } = useContext(MeetingContext);

	useEffect(() => {
		const check = async () => {
			const res = await isValidRoom(props.match.params.id);
			if (res.exists) {
				history.push('/');
			}
		};

		check();
	}, []);

	const [ mediaConfigurations, setMediaConfigurations ] = useState({ isAudioMuted: false, isVideoMuted: false, audioDevice: '', videoDevice: '' });

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
				<ReactLoading type={'spin'} color="#f7f7f7" />
				<h3 style={{ color: '#f7f7f7' }}>Loading</h3>
			</div>
		);
	}

	return (
		<div
			style={{
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
			}}
		>
			{isLoading ? (
				renderLoader()
			) : (
				<Grid container item direction="row" xs={12} className={classes.card} justify="center" alignItems="center">
					<PreviewTrack track={localTracks[1]} mediaConfig={mediaConfigurations} handleVideo={handleVideo} handleAudio={handleAudio} />

					<Grid container item direction="row" xs={12} sm={4} lg={3} className={classes.container} justify="space-evenly" alignItems="center">
						<PreJoinForm
							roomID={props.match.params.id}
							mediaConfig={mediaConfigurations}
							setMediaConfig={setMediaConfigurations}
							handleSubmit={(userName) => handleJoin(userName)}
						/>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default PreJoinPage;
