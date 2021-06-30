import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import PreJoinForm from '../components/PreJoinForm';
import VideoTrack from '../components/VideoTrack';
import { connect } from 'react-redux';
import { setMediaConfig } from '../store/actions';
import { useLocalMedia, useAudioDevices, useVideoDevices } from '../hooks';
import MEDIA_CONSTRAINTS from '../constants/MediaConstraints';
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
	const localTrack = useLocalMedia(MEDIA_CONSTRAINTS);
	const audioDevices = useAudioDevices();
	const videoDevices = useVideoDevices();

	const [ mediaConfigurations, setMediaConfigurations ] = useState({ isAudioMuted: false, isVideoMuted: false });

	useEffect(() => {
		return function cleanUp () {
			props.setMediaConfig(mediaConfigurations);
		};
	});

	const handleAudio = () => {
		if (mediaConfigurations.isAudioMuted) {
			localTrack[0].enable();
			setMediaConfigurations({ ...mediaConfigurations, isAudioMuted: false });
		} else {
			localTrack[0].disable();
			setMediaConfigurations({ ...mediaConfigurations, isAudioMuted: true });
		}
	};

	const handleVideo = () => {
		if (mediaConfigurations.isVideoMuted) {
			localTrack[1].enable();
			setMediaConfigurations({ ...mediaConfigurations, isVideoMuted: false });
		} else {
			localTrack[1].disable();
			setMediaConfigurations({ ...mediaConfigurations, isVideoMuted: true });
		}
	};

	const handleJoin = () => {
		history.push(`/meetingroom/${props.match.params.id}`);
	};

	return (
		<div style={{ display: 'flex', flex: 1, height: '95vh', justifyContent: 'center', alignItems: 'center' }}>
			<Grid container item direction="row" xs={12} className={classes.card} justify="center" alignItems="center">
				<VideoTrack track={localTrack} mediaConfig={mediaConfigurations} handleVideo={handleVideo} handleAudio={handleAudio} />

				<Grid container item direction="row" xs={12} sm={4} lg={3} className={classes.container} justify="space-evenly" alignItems="center">
					<PreJoinForm
						roomID={props.match.params.id}
						audioDevices={audioDevices}
						videoDevices={videoDevices}
						mediaConfig={mediaConfigurations}
						setMediaConfig={setMediaConfigurations}
						handleSubmit={handleJoin}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default connect(null, { setMediaConfig })(PreJoinPage);
