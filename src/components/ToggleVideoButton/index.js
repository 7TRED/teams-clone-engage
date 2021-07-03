import React, { useState, useEffect } from 'react';
import { Button, Fab, makeStyles } from '@material-ui/core';
import { Videocam, VideocamOff } from '@material-ui/icons';

function ToggleVideoButton ({ mediaConfig, handleClick }) {
	const [ isMuted, setMuted ] = useState(mediaConfig?.isVideoMuted);
	const classes = useStyles();
	useEffect(
		() => {
			setMuted(mediaConfig?.isVideoMuted);
		},
		[ mediaConfig ],
	);

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClick} className={`${isMuted ? classes.inactive : classes.root}`}>
				{isMuted ? <VideocamOff /> : <Videocam />}
			</Button>
		</React.Fragment>
	);
}

const useStyles = makeStyles({
	root     : {
		background   : 'transparent',
		borderWidth  : 1,
		borderStyle  : 'solid',
		borderRadius : 1000,
		borderColor  : 'white',
		color        : 'white',
		height       : 60,
	},

	inactive : {
		background   : 'transparent',
		borderWidth  : 1,
		borderStyle  : 'solid',
		borderRadius : 100,
		borderColor  : 'red',
		color        : 'red',
		height       : 60,
	},
});
export default ToggleVideoButton;
