import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Measure from 'react-measure';
import { useCardRatio, useOffsets } from '../../hooks';
import ToggleAudioButton from '../ToggleAudioButton';
import ToggleVideoButton from '../ToggleVideoButton';

function PreviewTrack (props) {
	const videoRef = React.useRef(null);
	const userAudio = React.useRef(null);

	const [ container, setContainer ] = useState({ height: 0, width: 0 });
	const [ aspectRatio, calculateRatio ] = useCardRatio(1.7777778);

	const offsets = useOffsets(videoRef.current && videoRef.current.videoWidth, videoRef.current && videoRef.current.videoHeight, container.width, container.height);

	const classes = useStyles();

	React.useEffect(
		() => {
			if (props.track) {
				// props.track[0]?.attach(userAudio.current);
				props.track?.attach(videoRef.current)
			}
		},
		[ props.track ],
	);



	function handleResize (contentRect) {
		setContainer({
			height : Math.round(contentRect.bounds.width / aspectRatio),
			width  : contentRect.bounds.width,
		});
	}

	console.log(props.track);
	function handleCanPlay () {
		calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
		videoRef.current.play();
	}

	return (
		<Measure bounds onResize={handleResize}>
			{({ measureRef }) => (
				<div ref={measureRef} className={classes.videoContainer} style={{ height: `${container.height}px` }}>
					<video ref={videoRef} onCanPlay={handleCanPlay} style={{ top: `-${offsets.y}px`, left: `-${offsets.x}px` }} autoPlay playsInline className={classes.video} />
					<div className={classes.btnContainer}>
						<div className={classes.btn}>
							<ToggleAudioButton mediaConfig={props.mediaConfig} handleClick={props.handleAudio} />
							<ToggleVideoButton mediaConfig={props.mediaConfig} handleClick={props.handleVideo} />
						</div>
					</div>
				</div>
			)}
		</Measure>
	);
}

const useStyles = makeStyles({
	videoContainer : {
		borderRadius    : '1em',
		backgroundColor : '#222',
		overflow        : 'hidden',
		position        : 'relative',
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
