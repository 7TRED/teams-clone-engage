import React from 'react';
import { Avatar, Typography, makeStyles, Grow, Grid } from '@material-ui/core';

import { useIsTrackEnabled, useIsTrackSwitchedOff, usePublications, useTracks } from '../../hooks';

import Video from '../Video';
import AudioTrack from '../AudioTrack';

import './styles.css';

function ParticipantCard (props) {
	const publications = usePublications(props.participant);
	const { cardWidthAndMargin: dimensions } = props;
	const filteredPublications = React.useMemo(()=>publications.filter(p => p !== undefined),[publications]);

	const audioPublication = React.useMemo(()=>filteredPublications.find((p) => p.kind === 'audio'),[filteredPublications]);
	const videoPublication = React.useMemo(()=>filteredPublications.find((p) => p.kind === 'video'),[filteredPublications]);

	const videoTrack = useTracks(videoPublication);
	const isVideoEnabled = useIsTrackEnabled(videoTrack);
	// const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

	
	const audioTrack = useTracks(audioPublication);
	const isAudioEnabled = useIsTrackEnabled(audioTrack);

	const classes = useStyles();
	console.log("dimension: ", dimensions);
	return (
		<div
			className={'video-card'}
			style={{
				width  : `${dimensions.width - dimensions.margin * 2}px`,
				height : `${dimensions.width * (9 / 16) - dimensions.margin * 2}px`,
				margin : `${dimensions.margin}px`,
			}}
		>
			{isVideoEnabled ? <Video track={videoTrack} />:<Avatar
				className={classes.avatar}
			>
				{props.participant?.identity}
			</Avatar>}

			{isAudioEnabled ? <AudioTrack track={audioTrack}/>:null}
			
		</div>
	);
}

const useStyles = makeStyles({
	card   : {
		position      : 'relative',
		verticalAlign : 'middle',
		alignSelf     : 'center',
		borderRadius  : '10px',
		overflow      : 'hidden',
		display       : 'flex',
		boxShadow     : '0px, 12px, 22px, rgba(0,0,0,0.4)',
		background    : '#222',
	},

	avatar : {
		backgroundColor : '#666611',
		width           : '15%',
		height: '15%',
		alignSelf: 'center',
		justifySelf:'center'
	},
});

export default ParticipantCard;
