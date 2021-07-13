import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Measure from 'react-measure';
import { useCardRatio, useOffsets } from '../../hooks';
import ToggleAudioButton from '../ToggleAudioButton';
import ToggleVideoButton from '../ToggleVideoButton';
import VideoCloseCard from '../VideoCloseCard';
import {AuthContext} from '../../context/AuthContext';
import AudioTrack from '../AudioTrack';



function PreviewTrack (props) {
	const videoRef = React.useRef(null);
	const { authState } = useContext(AuthContext);
	const [ container, setContainer ] = useState({ height: 0, width: 0 });
	const [ aspectRatio, calculateRatio ] = useCardRatio(1.7777778);
	const offsets = useOffsets(videoRef.current && videoRef.current.videoWidth, videoRef.current && videoRef.current.videoHeight, container.width, container.height);
	const classes = useStyles();

	React.useEffect(
		() => {
			if (props.track) {
				props.track && props.track[1]?.attach(videoRef.current)
			}
		},
		[ props.track, props.mediaConfig ],
	);

	function handleResize (contentRect) {
		setContainer({
			height : Math.round(contentRect.bounds.width / aspectRatio),
			width  : contentRect.bounds.width,
		});
	}

	function handleCanPlay () {
		calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
		videoRef.current.play();
	}

	return (
		<Measure bounds onResize={handleResize}>
			{({ measureRef }) => (
				<div ref={measureRef} className={classes.videoContainer} style={{ height: `${container.height}px` }}>
					{!props.mediaConfig.isVideoMuted ? <video ref={videoRef} onCanPlay={handleCanPlay} style={{ top: `-${offsets.y}px`, left: `-${offsets.x}px` }} autoPlay playsInline className={classes.video} /> :
						(
							<VideoCloseCard src={authState.user.photoURL} isAudioMuted={props.mediaConfig.isAudioMuted} displayName={authState.user.displayName} size={'7rem'} />
					)}
					<div className={classes.btnContainer}>
						<div className={classes.btn}>
							<ToggleAudioButton mediaConfig={props.mediaConfig} handleClick={props.handleAudio} />
							<ToggleVideoButton mediaConfig={props.mediaConfig} handleClick={props.handleVideo} />
						</div>
					</div>
					<AudioTrack track={props.track[0]} />
				</div>
			)}
		</Measure>
	);
}

const useStyles = makeStyles({
	videoContainer : {
		borderRadius    : '1rem',
		backgroundColor : '#222',
		overflow        : 'hidden',
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '40%'
	},
	video          : {
		width  : '100%',
		height : '100%',
	},
	btnContainer   : {
		width      : '100%',
		height     : '100%',
		position   : 'absolute',
		top        : 0,
		left       : 0,
		background : 'rgba(0,0,0,0.3)',
	},
	btn            : {
		position : 'absolute',
		top      : '75%',
		left     : '41%',
	},
});

export default PreviewTrack;
