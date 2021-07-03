import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const Video = (props) => {
	const videoRef = React.useRef(null);

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
			<video ref={videoRef} onCanPlay={handleCanPlay} playsInline autoPlay />
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
