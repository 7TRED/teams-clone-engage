import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const Video = (props) => {
	const videoRef = React.useRef(null);
	const classes = useStyles();

	useEffect(() => {
		if (props.track) {
			props.track.attach(videoRef.current);
		}
	});

	const handleCanPlay = () => {
		videoRef.current.play();
	};

	return (
		<React.Fragment>
			<video ref={videoRef} className={classes.video} onCanPlay={handleCanPlay} playsInline autoPlay />
		</React.Fragment>
	);
};

const useStyles = makeStyles({
	video : {
		flex   : 1,
		height : '100%',
	},
});

export default Video;
