import React from 'react';
import { Grid, makeStyles, Avatar, Typography } from '@material-ui/core';
import { Mic, MicOff } from '@material-ui/icons';
function VideoCloseCard ({ src, isAudioMuted, displayName, size }) {
	const classes = useStyles();
	return (
		<Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
			<Grid container item direction="row" justify="center" alignItems="center" className={classes.avatarContainer}>
				<Avatar src={src} style={{ width: size, height: size }} />
			</Grid>
			<Grid container item direction="row" alignItems="center" justify="space-between" className={classes.footer}>
				{isAudioMuted ? <MicOff /> : <Mic />}
				<Typography variant="subtitle1" color={'inherit'} className={classes.displayName}>
					{displayName}
				</Typography>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root            : {
		width        : '100%',
		height       : '100%',
		background   : '#222',
		color        : 'white',
		borderRadius : 10,
		boxShadow    : '2px 0 4px 0 #111',
	},
	avatarContainer : {
		width  : '100%',
		height : '90%',
	},
	footer          : {
		width   : '100%',
		height  : '10%',
		padding : '1%',
	},
	displayName     : {
		fontWeight : 'bold',
	},
});

export default VideoCloseCard;
